import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useLayoutEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ContactSales from "./pages/ContactSales";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import HelpCenter from "./pages/HelpCenter";
import About from "./pages/About";
import Security from "./pages/security";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevents aggressive refetching when switching browser tabs
      retry: 1, // Number of retries on network failure
      staleTime: 5 * 60 * 1000, // Data stays fresh in memory for 5 minutes
    },
  },
});

function App() {
  const location = useLocation();
  const showMarketingLayout = !location.pathname.startsWith("/dashboard");
  function ScrollToTop({ children }) {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return children;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#ffffff",
              color: "#171717",
              fontSize: "13px",
              fontWeight: "600",
              borderRadius: "12px",
              border: "1px solid #e5e5e5",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
            },
          }}
        />
        <ScrollToTop>
          {showMarketingLayout && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact-sales" element={<ContactSales />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/about" element={<About />} />
            <Route path="/security" element={<Security />} />
          </Routes>
          {showMarketingLayout && <Footer />}
        </ScrollToTop>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
