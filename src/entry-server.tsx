import { renderToString } from "react-dom/server";
import { GlobalTheme } from "@carbon/react";
import App from "./App";

export function render(): string {
  return renderToString(<GlobalTheme theme="g10"><App /></GlobalTheme>);
}
