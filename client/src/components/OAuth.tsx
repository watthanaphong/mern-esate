import { FaGoogle } from "react-icons/fa";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useAppDispatch } from "../redux/hooks";

const OAuth = () => {
  const dispatch = useAppDispatch();   // ✅ hook ต้องอยู่นอก
  const navigate = useNavigate();      // ✅ hook ต้องอยู่นอก

  const handleGoogleClick = async () => {
    try {
      dispatch(signInStart());

      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        dispatch(signInFailure(data.message || "Google sign in failed"));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error: any) {
      dispatch(signInFailure(error.message));
      console.log("could not sign in with google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="
        w-full
        flex items-center justify-center gap-3
        bg-[#241E18]
        border border-[#C6A15B]
        text-[#C6A15B]
        py-3
        rounded-lg
        tracking-wide
        uppercase
        text-sm
        hover:bg-[#2E271F]
        transition
        font-medium
      "
    >
      <FaGoogle className="text-lg" />
      Continue with Google
    </button>
  );
};

export default OAuth;
