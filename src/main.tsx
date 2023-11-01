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
import global_en from "@/translations/en/global.json";
import global_fr from "@/translations/fr/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    fr: {
      global: global_fr,
    },
  },
});
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
      <I18nextProvider i18n={i18next}>
        <App>
          <AppRoutes />
        </App>
      </I18nextProvider>
    </Router>
  </React.StrictMode>
);
