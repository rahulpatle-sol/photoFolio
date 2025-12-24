import { getAuth, GoogleAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const googleLogin = () => {
  const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

  if (isFirefox) {
    return signInWithRedirect(auth, provider);
  }

  return signInWithPopup(auth, provider);
};

export { auth };
