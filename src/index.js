import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Screen } from "./Demo/";

const element = document.getElementById("root");
const root = createRoot(element);

root.render(
  <StrictMode>
    <Screen />
  </StrictMode>
);
