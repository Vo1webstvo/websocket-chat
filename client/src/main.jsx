import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

import "./styles/main.css";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
