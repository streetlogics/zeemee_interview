import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Assuming you have a div with id 'root' in your HTML where you want to render the component
document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
});
