import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Albums from "./Pages/Album";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlbumDetails from "./Pages/AlbumDetails";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ResetPassword.jsx";
function App() {
  return (
    <BrowserRouter>
      {/* ToastContainer yahan hone se poore app mein notifications dikhenge */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login/>} />

        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:albumId" element={<AlbumDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;