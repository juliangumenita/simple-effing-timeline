<a href="https://github.com/juliangumenita/simple-effing-timeline"><img alt="simple-effing-timeline" src="https://raw.githubusercontent.com/juliangumenita/simple-effing-timeline/main/src/Demo/Assets/Header.svg"/></a>
<br />
<div align="center"><strong>Simple f*cking timeline for React.</strong></div>
<div align="center">Lightweight, customizable and super fast.</div>
<br />
<div align="center">
<a href="https://gumenita.com/">Website</a>
<span> · </span>
<a href="https://github.com/juliangumenita/simple-effing-timeline">Documentation</a>
<span> · </span>
<a href="https://www.instagram.com/juliangumenita/">Instagram</a>
</div>
<br />
<div align="center">
  <sub>Made by <a href="https://gumenita.com/">Julian Gumenita</a>‍</sub>
</div>
<br />

# Features

# Getting started

```bash
# via yarn
yarn add simple-effing-timeline

# via npm
npm install --save simple-effing-timeline
```

# Usage

```jsx
import { Calendar } from "simple-effing-timeline";

ReactDOM.render(
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
  />,
  document.getElementById("root")
);
```
