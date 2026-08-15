import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { GlobalTheme } from "@carbon/react";
import "./carbon.scss";
import "./styles.css";
import App from "./App";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element");

hydrateRoot(
  root,
  <StrictMode>
    <GlobalTheme theme="g10"><App /></GlobalTheme>
  </StrictMode>,
);
