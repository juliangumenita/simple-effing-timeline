import React, { useState, useEffect } from "react";
import { Box, Text } from "simple-effing-primitive-layout";

import TimelineEvent from "../Molecules/TimelineEvent";

import Lodash from "lodash";
import Moment from "moment/min/moment-with-locales";

const CalendarConfiguraton = {
  width: "100%",
  height: 500,
  wrapper: {},
  month: 280,
  radius: 5,
  border: "0.5px solid #ECF0F5",
  family: undefined,
  legends: {
    display: true,
  },
  categories: {},
  today: "Today",
};

const Calendar = ({
  configuraton = CalendarConfiguraton,
  events = [],
  language = "en",
}) => {
  Moment.locale(language);

  const [error, _error] = useState(false);
  const [months, _months] = useState([]);
  const [hide, _hide] = useState([]);
  const [today, _today] = useState(false);

  const _configuraton = { ...CalendarConfiguraton, ...configuraton };
  const _events = Lodash.sortBy(events, ["start"]);
  let _height = _configuraton.height;

  const daysInBetween = (first, last) => {
    try {
      let days = Moment(last).diff(Moment(first), "days", true);

      return days;
    } catch (Error) {
      console.error(Error);
    }
    return 0;
  };

  const monthsInBetween = (first, last) => {
    try {
      let months = Math.floor(Moment(last).diff(Moment(first), "months"));

      return months - 1 < 0 ? 0 : months - 1;
    } catch (Error) {
      console.error(Error);
    }
    return 0;
  };

  const onSameMonth = (first, last) => {
    try {
      return Moment(first).format("YYYY-MM") === Moment(last).format("YYYY-MM");
    } catch (Error) {
      console.error(Error);
    }
    return 0;
  };

  const daysInMonth = (first, last) => {
    return Moment(first).daysInMonth();
  };

  const daysToEndOfMonth = (date) => {
    return (
      daysInBetween(date, Moment(date).endOf("month").format("YYYY-MM-DD")) + 1
    );
  };

  const daysToStartOfMonth = (date) => {
    return daysInBetween(
      Moment(date).startOf("month").format("YYYY-MM-DD"),
      date
    );
  };

  const transform = (events) => {
    const items = [];

    let steps = 0;
    let next = 0;

    events.map((_event) => {
      let overrides = false;

      if (_event.id === undefined) {
        _event.id = Math.random();
      }

      events.map((_control) => {
        if (_control.id === undefined) {
          _control.id = Math.random();
        }

        if (
          _event.start >= _control.start &&
          _event.start <= _control.end &&
          _event.id != _control.id
        ) {
          overrides = true;
        }

        if (
          onSameMonth(_event.start, _control.start) ||
          onSameMonth(_event.end, _control.end)
        ) {
          if (_event.id != _control.id) {
            overrides = true;
          }
        }
      });

      if (overrides) {
        steps++;
        next++;
      }

      if (!overrides) {
        next = 0;
      }

      _event.steps = next;

      items.push(_event);
    });

    return { events: items, steps };
  };

  const _transform = transform(_events);

  let _startPoint = Moment().format("YYYY-MM-DD");

  const pixel = (first, last, debug = false) => {
    const _monthsInBetween = monthsInBetween(first, last);
    const _daysInBetween = daysInBetween(first, last);
    const _onSameMonth = onSameMonth(first, last);
    const _daysInFirstMonth = daysInMonth(first);
    const _daysInLastMonth = daysInMonth(last);
    const _dayWidthOfFirstOfMonth = _configuraton.month / _daysInFirstMonth;
    const _dayWidthOfLastOfMonth = _configuraton.month / _daysInLastMonth;

    if (_onSameMonth) {
      const _daysInThisMonth = _daysInBetween + 1;
      return _dayWidthOfFirstOfMonth * _daysInThisMonth;
    }

    if (!_onSameMonth) {
      const _monthsInBetweenWidth = _monthsInBetween * _configuraton.month;
      const _firstToEndWidth =
        daysToEndOfMonth(first) * _dayWidthOfFirstOfMonth;
      const _lastToStartWidth =
        daysToStartOfMonth(last) * _dayWidthOfLastOfMonth;

      return _monthsInBetweenWidth + _firstToEndWidth + _lastToStartWidth;
    }
  };
  if (_events.length) {
    const _firstEvent = Moment(_events[0].start);
    const _lastEvent = Moment(_events[_events.length - 1].start);
    const _monthsDifference =
      Math.ceil(_lastEvent.diff(_firstEvent, "months", true)) + 4;
    _startPoint = _firstEvent.subtract(1, "months");

    useEffect(() => {
      const moments = [];

      for (var i = 0; i < _monthsDifference; i++) {
        const _start =
          moments.length > 0 ? moments[moments.length - 1].date : _startPoint;
        const _date =
          moments.length > 0
            ? Moment(_start).add(1, "months", true)
            : _startPoint;

        const moment = {
          label: _date.format("MMMM YYYY"),
          width: _configuraton.month,
          short: _date.format("MMMM"),
          date: _date,
        };

        moments.push(moment);
      }
      _months(moments);

      _today(
        pixel(
          _startPoint.format("YYYY-MM-") + "01",
          Moment().format("YYYY-MM-DD")
        )
      );
    }, [events]);
  }

  const legends = [];
  for (const [key, value] of Object.entries(_configuraton.categories)) {
    legends.push({
      key,
      ...value,
    });
  }

  _height = +_transform.steps * 75 + 100;

  return (
    <Box width={_configuraton.width} {..._configuraton.wrapper}>
      <Box
        border={_configuraton.border}
        height={_configuraton.height + 1}
        radius={_configuraton.radius}
        overflow="auto"
        style={{
          minHeight: _configuraton.height + 1,
        }}
        scroll={
          today
            ? {
                left: today - _configuraton.month,
              }
            : undefined
        }
      >
        <Box display="flex" position="relative">
          {today ? (
            <>
              <Box
                parse="p:absolute t:0 w:2"
                style={{
                  left: today,
                  height: _height,
                  borderRight: "2px dashed rgba(166,173,185,0.5)",
                }}
              >
                <Box
                  height={_height}
                  parse="w:2 ox:visible oy:visible p:relative"
                >
                  <Box
                    style={{
                      transform: "translate(-50%, -50%)",
                      position: "sticky",
                      zIndex: 1,
                    }}
                    color
                    parse="fd:column j:center a:center d:inline-flex p:absolute b:unset t:50% l:50% r:unset i:3"
                  >
                    <Box
                      color="#D9DDE2"
                      parse="oy:auto mb:4 br:999 h:10 w:10"
                    />
                    <Text
                      color="#D9DDE2"
                      size={12}
                      weight="600"
                      style={{ backgroundColor: "#FFFFFF", height: 12 }}
                    >
                      {_configuraton.today}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </>
          ) : undefined}
          {_transform.events.map((item, i) => {
            return hide.includes(item.category) ? null : (
              <TimelineEvent
                key={i}
                top={item.steps * 75 <= 75 ? 75 : item.steps * 75}
                left={pixel(_startPoint.format("YYYY-MM-") + "01", item.start)}
                width={pixel(item.start, item.end, true)}
                configuraton={configuraton}
                item={item}
              />
            );
          })}
          {months.map((month, i) => (
            <Box
              key={i}
              css="simple-effing-month-wrapper"
              width={month.width}
              style={{
                minHeight: _height,
                height: _height + 1,
                borderLeftWidth: 0,
                flexShrink: 0,
              }}
              border="0.5px solid #ECF0F5"
              parse="o:visible pa:10"
            >
              <Text
                size={12}
                weight="600"
                css="simple-effing-month-label"
                style={{
                  textTransform: "uppercase",
                  position: "sticky",
                  top: 10,
                }}
                color="#D9DDE2"
              >
                {month.label}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
      {_configuraton?.legends?.display ? (
        <Box parse="d:flex a:center j:flex-end fw:wrap mt:20">
          {legends.map((legend) => (
            <Box
              parse="ml:10 d:inline-flex a:center"
              key={legend.key}
              press={() => {
                if (hide.includes(legend.key)) {
                  _hide(Lodash.without(hide, legend.key));
                } else {
                  _hide([...hide, legend.key]);
                }
              }}
            >
              <Box
                parse="w:15 h:15 br:5 mr:5"
                color={
                  hide.includes(legend.key) ? "#90959E" : legend.background
                }
              />
              <Text
                color="#000000"
                opacity={hide.includes(legend.key) ? 0.5 : 1}
                size={12}
                line={15}
                weight={500}
              >
                {legend.title}
              </Text>
            </Box>
          ))}
        </Box>
      ) : undefined}
    </Box>
  );
};

export default Timeline;
