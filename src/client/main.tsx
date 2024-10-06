// import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React from "react";
import ReactDOM from "react-dom/client";

import Root from "./Root";
import Home from "./Home";
import Login from "./Login";
import About from "./About";
import Editor from "./Editor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
