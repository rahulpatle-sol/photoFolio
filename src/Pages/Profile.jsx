import { useEffect, useState } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import { LogOut, Mail, User, Camera } from "lucide-react";
import { toast } from "react-toastify";


export default function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(
        user.photoURL ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`
      );
    }
  }, [user]);

  /* -------- UPDATE PROFILE -------- */
  const handleUpdate = async () => {
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  /* -------- LOGOUT -------- */
  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out");
    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl"
      >
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={photoURL}
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-white/30"
            />
            <div className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mt-4">
            {user.displayName}
          </h2>
          <p className="text-white/60 text-sm">{user.email}</p>
        </div>

        {/* FORM */}
        <div className="mt-8 space-y-5">
          <div>
            <label className="text-white/70 text-sm">Display Name</label>
            <div className="flex items-center bg-white/10 rounded-xl px-3 mt-1">
              <User className="w-4 h-4 text-white/50" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent w-full p-3 text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-white/70 text-sm">Email</label>
            <div className="flex items-center bg-white/5 rounded-xl px-3 mt-1">
              <Mail className="w-4 h-4 text-white/40" />
              <input
                value={user.email}
                disabled
                className="bg-transparent w-full p-3 text-white/60"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleUpdate}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold"
          >
            Save Changes
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="w-full py-3 border border-red-500/50 rounded-xl text-red-400 flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
