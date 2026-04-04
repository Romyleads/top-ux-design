import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import LocaleRouter from "@/components/LocaleRouter";
import Index from "./pages/Index";
import ServicePage from "./pages/ServicePage";
import CategoryPage from "./pages/CategoryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import NotFound from "./pages/NotFound";
import LocaleRedirect from "@/components/LocaleRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Root → redirect to /:locale */}
            <Route path="/" element={<LocaleRedirect />} />

            {/* Locale-prefixed routes */}
            <Route path="/:locale" element={<LocaleRouter />}>
              <Route index element={<Index />} />
              <Route path="services/:id" element={<ServicePage />} />
              <Route path="category/:id" element={<CategoryPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="faq" element={<FAQPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
