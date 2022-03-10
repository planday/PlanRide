import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locale/en";
import ua from "./locale/ua";

i18n
  .use(initReactI18next)
  .init({
    resources: {
        en: { PlanRide: en },
        ua: { PlanRide: ua },
    },
    fallbackLng: "en",
    debug: true,
    ns: ["PlanRide"],
    defaultNS: "PlanRide",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
