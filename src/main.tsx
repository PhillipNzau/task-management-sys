import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import Login from "./components/Login.tsx";
import SignUp from "./components/SignUp.tsx";
import Home from "./pages/Home.tsx";

// 2. Defining the route configuration
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <App>
        <AppRoutes />
      </App>
    </Router>
  </React.StrictMode>
);
