import { Navigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

export default function LocaleRedirect() {
  const { locale } = useLanguage();
  return <Navigate to={`/${locale}`} replace />;
}
