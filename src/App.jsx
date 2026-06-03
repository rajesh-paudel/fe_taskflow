import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ContactSales from "./pages/ContactSales";
function App() {
  const location = useLocation();
  const showMarketingLayout = location.pathname !== "/dashboard";

  return (
    <>
      {showMarketingLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact-sales" element={<ContactSales />} />
      </Routes>
      {showMarketingLayout && <Footer />}
    </>
  );
}

export default App;
