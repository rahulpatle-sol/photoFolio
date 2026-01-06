import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Albums from  "../Pages/Album"

export default function Dashboard({ user, onLogout }) {
  const [active, setActive] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <Sidebar
        active={active}
        setActive={setActive}
        user={user}
        onLogout={onLogout}
      />

      <main className="ml-20 md:ml-64 p-8 text-white">
        {active === "home" && <h1 className="text-3xl">Welcome back 👋</h1>}
        {active === "albums" && <Albums />}
        {active === "profile" && <h1>Profile Page</h1>}
      </main>
    </div>
  );
}
