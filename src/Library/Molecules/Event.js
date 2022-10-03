import React, { useState, useEffect } from "react";
import { Box, Text } from "simple-effing-primitive-layout";
import Moment from "moment/min/moment-with-locales";

const Event = ({
  item = {},
  top,
  left,
  width,
  configuraton = {},
  background = "#90959E",
  color = "#FFFFFF",
}) => {
  const [box, _box] = useState(null);
  const [content, _content] = useState(null);
  const [overflow, _overflow] = useState(false);

  const _background =
    configuraton?.categories[item.category]?.background || background;
  const _color = configuraton?.categories[item.category]?.color || color;

  useEffect(() => {
    try {
      if (box && content) {
        if (content?.offsetWidth + 50 >= box?.offsetWidth) {
          _overflow(true);
        }
      }
    } catch (Error) {
      console.error(Error);
    }
  }, [box, content]);

  const date =
    Moment(item.start).format("D MMMM") === Moment(item.end).format("D MMMM")
      ? Moment(item.start).format("D MMMM")
      : Moment(item.start).format("D MMMM") +
        " - " +
        Moment(item.end).format("D MMMM");

  const short =
    Moment(item.start).format("D MMM") === Moment(item.end).format("D MMM")
      ? Moment(item.start).format("D MMM")
      : Moment(item.start).format("D MMM") +
        " - " +
        Moment(item.end).format("D MMM");

  return (
    <Box
      layer={2}
      style={{
        position: "absolute",
        top,
        left,
      }}
    >
      <Box
        key={item.id}
        style={{ width, height: overflow ? 10 : 50 }}
        color={_background}
        parse="br:10 a:center d:inline-flex pr:12.5 pl:12.5"
        referrer={(ref) => _box(ref)}
      >
        <Box
          referrer={(ref) => _content(ref)}
          opacity={overflow ? 0 : 1}
          width={overflow ? 0 : undefined}
        >
          <Text
            color={_color}
            display="block"
            bottom={5}
            line={12.5}
            size={12.5}
            style={{ whiteSpace: "nowrap" }}
            weight="600"
          >
            {item.title}
          </Text>
          <Text
            color={_color}
            display="block"
            bottom={0}
            line={12.5}
            size={11}
            opacity={0.5}
            style={{ whiteSpace: "nowrap" }}
          >
            {item.description ? item.description + " | " + date : date}
          </Text>
        </Box>
      </Box>
      {overflow ? (
        <Box top={10}>
          <Text
            weight="600"
            color="#000000"
            display="block"
            bottom={5}
            line={12.5}
            size={12.5}
            style={{ whiteSpace: "nowrap" }}
          >
            {item.title}
          </Text>
          <Text
            color="#000000"
            display="block"
            bottom={0}
            line={12.5}
            size={11}
            opacity={0.5}
            style={{ whiteSpace: "nowrap" }}
          >
            {item.description ? item.description + " | " + short : short}
          </Text>
        </Box>
      ) : undefined}
    </Box>
  );
};

export default Event;
