"use client";

import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { I18nProvider } from "./i18n";
import "./styles/globals.css";

export default function SdframeRoot() {
  useEffect(() => {
    document.body.dataset.catalog = "sd";
    return () => {
      delete document.body.dataset.catalog;
      document.documentElement.removeAttribute("data-theme");
    };
  }, []);

  return (
    <div className="sd-catalog">
      <I18nProvider>
        <BrowserRouter basename="/dev">
          <App />
        </BrowserRouter>
      </I18nProvider>
    </div>
  );
}
