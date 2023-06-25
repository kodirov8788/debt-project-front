import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Singlepage from "./pages/singlepage/Singlepage";
import { DataProvider } from "./context/GlobalState";
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/qarzdor/:id" element={<Singlepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>

  </React.StrictMode>
);
