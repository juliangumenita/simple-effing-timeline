import { Box } from "simple-effing-primitive-layout";
import Calendar from "../../Library/Organisms/Calendar";

const Screen = ({ children }) => {
  return (
    <Box parse="w:100% h:100% d:flex a:center j:center">
      <Box parse="w:80%">
        <Calendar
          configuraton={{
            categories: {
              event: {
                title: "Events",
                background: "#FF7300",
                color: "#FFFFFF",
              },
              announcement: {
                title: "Announcements",
                background: "#F15229",
                color: "#FFFFFF",
              },
              workshop: {
                title: "Workshops",
                background: "#FEBD32",
                color: "#000000",
              },
            },
            legends: {
              display: true,
            },
          }}
          events={[
            {
              title: "React.js Meetup",
              description: "United Kingdom",
              category: "event",
              start: "2022-08-01",
              end: "2022-08-31",
            },
            {
              title: "Timeline 1.3.0 Update",
              category: "announcement",
              start: "2022-11-03",
              end: "2022-11-04",
            },
            {
              title: "React.js Workshop",
              description: "Limited To 20 Members",
              category: "workshop",
              start: "2023-02-03",
              end: "2023-02-28",
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default Screen;
