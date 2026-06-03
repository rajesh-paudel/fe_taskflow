import { Routes, Route, useLocation } from "react-router-dom";
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
function App() {
  const location = useLocation();
  const showMarketingLayout = !location.pathname.startsWith("/dashboard");

  return (
    <>
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
    </>
  );
}

export default App;
