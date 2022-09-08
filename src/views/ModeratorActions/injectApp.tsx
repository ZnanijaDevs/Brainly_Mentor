import { createRoot } from "react-dom/client";
import App from "./App";

export default () => {
  const root = createRoot(document.getElementById("app"));
  
  root.render(<App />);
};