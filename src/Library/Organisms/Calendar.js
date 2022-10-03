import React, { useState, useEffect } from "react";
import { Box, Text } from "simple-effing-primitive-layout";

import EventType from "../Types/EventType";
import Event from "../Molecules/Event";

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
};

const Calendar = ({
  configuraton = CalendarConfiguraton,
  events = [],
  language = "en",
}) => {
  Moment.locale(language);

  const [error, _error] = useState(false);
  const [months, _months] = useState([]);

  const _configuraton = { ...CalendarConfiguraton, ...configuraton };
  const _events = Lodash.sortBy(events, ["start"]);
  const _height = _configuraton.height;

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
          overrides = true;
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
      Math.ceil(_lastEvent.diff(_firstEvent, "months", true)) + 2;
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
    }, [events]);
  }

  return (
    <Box
      border={_configuraton.border}
      width={_configuraton.width}
      height={_configuraton.height + 1}
      radius={_configuraton.radius}
      overflow="hidden"
      {..._configuraton.wrapper}
      style={{ overflowX: "auto" }}
    >
      <Box display="flex" position="relative">
        {_transform.events.map((item, i) => {
          return (
            <Event
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
              }}
              color="#D9DDE2"
            >
              {month.label}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Calendar;
