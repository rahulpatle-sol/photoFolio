import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components & Hooks
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader"; // Tera GSAP wala amiro wala loader
import { useSmoothScroll } from "./hooks/UseSmoothScroll";

// Pages



import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Albums from "./Pages/Album";
import AlbumDetails from "./Pages/AlbumDetails";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ResetPassword.jsx";
import Pricing from "./ui/Pricing.jsx";
import Contact from "./Pages/Contact.jsx";
import About from "./Pages/About.jsx";
import Services from "./Pages/Services.jsx";
import NotFound from "./components/NotFound.jsx";

// Page Transition Wrapper
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();
  
  // 🔥 Magic Fix: Check if loader already shown in this session
  const [loading, setLoading] = useState(() => {
    // Agar session mein 'true' hai toh loading false rakho
    return !sessionStorage.getItem("vault-loader-finished");
  });

  useSmoothScroll(); 

  const handleLoaderFinish = () => {
    sessionStorage.setItem("vault-loader-finished", "true");
    setLoading(false);
  };

  return (
    <>
    <Navbar />
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="main-loader" finishLoading={handleLoaderFinish} />
        ) : (
          <motion.div 
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
                <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
                <Route path="/forgot-password" element={<PageWrapper><ForgotPassword /></PageWrapper>} />
                <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
                <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
                <Route path="/albums" element={<PageWrapper><Albums /></PageWrapper>} />
                <Route path="/albums/:albumId" element={<PageWrapper><AlbumDetails /></PageWrapper>} />
                <Route path="/pricing" element={<PageWrapper><Pricing /></PageWrapper>} />
                <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
                {/* 404 Route */}
                <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* Amiro Wali Toast Notification Styling */}
      <ToastContainer 
        position="top-center" 
        autoClose={2500} 
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{ 
          backgroundColor: "#1A1A1A", 
          color: "#A68A56", 
          border: "1px solid rgba(166, 138, 86, 0.2)",
          borderRadius: "20px",
          fontSize: "10px",
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: "0.2em"
        }}
      />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;