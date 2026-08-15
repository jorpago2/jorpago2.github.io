import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { GlobalTheme } from "@carbon/react";
import "./carbon.scss";
import "./styles.css";
import App from "./App";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element");

const application = <StrictMode>
  <GlobalTheme theme="g10"><App /></GlobalTheme>
</StrictMode>;

if (root.childElementCount > 0) hydrateRoot(root, application);
else createRoot(root).render(application);
