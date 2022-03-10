import React from "react";
import Router from "./routes";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import ScrollToTop from "./components/ScrollToTop";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useTranslation } from "react-i18next";

import * as locales from 'date-fns/esm/locale';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={(locales as any)[i18n.language]}>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <Router />
      </ThemeConfig>
    </LocalizationProvider>
  );
};

export default App;
