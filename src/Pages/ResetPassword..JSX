import { useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async () => {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) alert(error.message);
    else {
      alert("Password updated");
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-[350px]">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        <input
          type="password"
          placeholder="New password"
          className="w-full mb-4 px-4 py-3 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
