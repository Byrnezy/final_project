import "./index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Home from "./Home";
import Login from "./Login";
import About from "./About";
import Editor from "./Editor";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/App" element={<App />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/About" element={<About />} />
        <Route path="/Editor" element={<Editor />} />
      </Routes>
    </Router>

  </React.StrictMode>,
);
