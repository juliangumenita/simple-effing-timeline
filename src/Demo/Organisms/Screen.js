import { Box } from "simple-effing-primitive-layout";
import Calendar from "../../Library/Organisms/Calendar";

const Screen = ({ children }) => {
  return (
    <Box parse="pa:100 ta:center">
      <a href="https://github.com/juliangumenita/simple-effing-timeline">
        <img
          alt="simple-effing-timeline"
          src="https://raw.githubusercontent.com/juliangumenita/simple-effing-timeline/main/src/Demo/Assets/Header.svg"
        />
      </a>
      <br />
      <div align="center">
        <strong>Simple f*cking timeline for React.</strong>
      </div>
      <div align="center">Lightweight, customizable and super fast.</div>
      <br />
      <div align="center">
        <a href="https://gumenita.com/">Website</a>
        <span> · </span>
        <a href="https://github.com/juliangumenita/simple-effing-timeline">
          Documentation
        </a>
        <span> · </span>
        <a href="https://www.instagram.com/juliangumenita/">Instagram</a>
      </div>
      <br />
      <div align="center">
        <sub>
          Made by <a href="https://gumenita.com/">Julian Gumenita</a>‍
        </sub>
      </div>
      <Box parse="mt:100">
        <Calendar
          configuraton={{
            categories: {
              design: {
                title: "Design",
                background: "#F15229",
                color: "#FFFFFF",
              },
              frontend: {
                title: "Frontend",
                background: "#FF7300",
                color: "#FFFFFF",
              },
              backend: {
                title: "Backend",
                background: "#FEBD32",
                color: "#000000",
              },
            },
            legends: {
              display: true,
            },
            width: "100%",
          }}
          events={[
            {
              title: "UX Research",
              description: "Kai",
              category: "design",
              start: "2022-09-01",
              end: "2022-09-12",
            },
            {
              title: "Design System",
              category: "design",
              description: "Kai",
              start: "2022-09-10",
              end: "2022-09-24",
            },
            {
              title: "Landing Page Redesign",
              category: "design",
              description: "Kai",
              start: "2022-09-25",
              end: "2022-10-12",
            },
            {
              title: "Setup Architecture",
              description: "Monica",
              category: "frontend",
              start: "2022-06-28",
              end: "2022-07-05",
            },
            {
              title: "Components",
              description: "Monica",
              category: "frontend",
              start: "2022-07-10",
              end: "2022-07-28",
            },
            {
              title: "Landing Page Improvements",
              description: "Monica",
              category: "frontend",
              start: "2022-07-28",
              end: "2022-08-16",
            },
            {
              title: "API Architecture",
              description: "Luca",
              category: "backend",
              start: "2022-11-18",
              end: "2022-12-15",
            },
            {
              title: "Authentication System",
              description: "Luca",
              category: "backend",
              start: "2022-12-16",
              end: "2022-12-25",
            },
            {
              title: "Performance & Security Improvements",
              description: "Luca",
              category: "backend",
              start: "2022-12-26",
              end: "2023-01-30",
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default Screen;
