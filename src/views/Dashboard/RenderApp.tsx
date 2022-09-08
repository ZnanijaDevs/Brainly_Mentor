import { createRoot } from "react-dom/client";
import Modal from "./Modal";

export default (rootElement: HTMLElement) => {
  const root = createRoot(rootElement);

  root.render(<Modal />);
};