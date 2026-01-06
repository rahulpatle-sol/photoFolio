
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import  Dashboard from "./Pages/Dashboard"
import Profile from "./Pages/Profile";
import Albums from "./Pages/Album";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile />} />
<Route path="/albums" element={<Albums />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
