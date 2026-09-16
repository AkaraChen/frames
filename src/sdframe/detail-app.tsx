"use client";

import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Layout from "./components/Layout";
import FrameworkPage from "./pages/FrameworkPage";
import { I18nProvider } from "./i18n";
import "./styles/globals.css";

function LeaveToNext() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const next = pathname === "/" ? "/dev" : `/dev${pathname}${search}`;
    window.location.replace(next);
  }, [pathname, search]);
  return null;
}

export function SdFrameworkDetailApp() {
  useEffect(() => {
    document.body.dataset.catalog = "sd";
    return () => {
      delete document.body.dataset.catalog;
      document.documentElement.removeAttribute("data-theme");
    };
  }, []);

  return (
    <I18nProvider>
      <BrowserRouter basename="/dev">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/frameworks/:slug" element={<FrameworkPage />} />
            <Route path="*" element={<LeaveToNext />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}
