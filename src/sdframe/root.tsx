"use client";

import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { I18nProvider } from "./i18n";
import "./styles/globals.css";

export default function SdframeRoot() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.dataset.catalog = "sd";
    return () => {
      delete document.body.dataset.catalog;
      document.documentElement.removeAttribute("data-theme");
    };
  }, []);

  if (!mounted) {
    return <div className="sd-catalog" />;
  }

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
