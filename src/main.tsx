import { render } from "@praxisjs/runtime";

import "./style.css";
import { Login } from "./pages/login";

render(<Login />, document.getElementById("app")!);

if (import.meta.env.DEV) {
  const { DevTools } = await import("@praxisjs/devtools");
  DevTools.init();
}
