import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Chrome } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import auth, { db } from "../components/firebase";
import toast, { Toaster } from "react-hot-toast";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const [signup, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [regdNo, setRegdNo] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const role = docSnap.data().role;
        setTimeout(() => {
          if (role === "admin") {
            navigate("/adminBoard");
          } else {
            navigate("/content");
          }
        }, 100);
      } else {
        toast.error("No role data found.");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(`${error.message}`, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };  

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const role = docSnap.data().role;
        setTimeout(() => {  
          navigate("/content");
        }, 100);
      } else {
        toast.error("No role data found.");
      }
    } catch (error) {
      toast.error(`${error.message}`, { position: "top-center" });
    }
  };  
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: username,
          regdNo: regdNo,
          role: "user",
        });
      }
      toast.success("Account created successfully", { position: "top-center" });
      navigate("/content");

      setRegdNo("");
      setEmail("");
      setPassword("");
      setUserName("");
    } catch (error) {
      toast.error(`${error.message}`, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-slate-50">
      <Toaster/>
      <form
        className="w-[400px] p-6 rounded-lg bg-white drop-shadow-sm animate-fade-in"
        onSubmit={signup ? handleSignUp : handleSignIn}
      >
        <div className="flex items-center gap-2 mb-2">
          <p className="text-md font-medium">E-Guide</p>
        </div>

        <div className="flex justify-evenly items-center border rounded-lg mb-4">
          <button
            type="button"
            className={`flex-1 p-2 rounded-lg ${!signup ? "bg-blue-700 text-white" : "text-blue-700 bg-white"}`}
            onClick={() => setSignUp(false)}
          >
            Sign-In
          </button>
          <button
            type="button"
            className={`flex-1 p-2 rounded-lg ${signup ? "bg-blue-700 text-white" : "text-blue-700 bg-white"}`}
            onClick={() => setSignUp(true)}
          >
            Sign-Up
          </button>
        </div>

        <h2 className="text-xl mt-3">Welcome to E-Guide</h2>
        <p className="text-sm text-gray-500 mb-2">
          Please {signup ? "sign-up your account" : "sign-in to your account"} to get the resources
        </p>

        <div className="flex flex-col items-start gap-1 mb-2">
          <label className="uppercase text-md">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="border-2 w-full h-10 px-3 placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
          />
        </div>

        {signup && (
          <>
            <div className="flex flex-col items-start gap-1 mb-2">
              <label className="uppercase text-md">Username</label>
              <input
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
                placeholder="Enter your username"
                className="border-2 w-full h-10 px-3 placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>

            <div className="flex flex-col items-start gap-1 mb-2">
              <label className="uppercase text-md">Regd.NO</label>
              <input
                value={regdNo}
                onChange={(e) => setRegdNo(e.target.value)}
                required
                placeholder="Enter your Registration Number"
                className="border-2 w-full h-10 px-3 placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>
          </>
        )}

        <div className="flex flex-col items-start gap-1 mb-2 relative">
          <label className="uppercase text-md">Password</label>
          {!signup && (
            <Link
              to="/forgotpassword"
              className="absolute right-0 text-sm text-blue-700 hover:underline top-1"
            >
              Forgot Password?
            </Link>
          )}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="border-2 w-full h-10 px-3 placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none pr-10"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-700 focus:outline-none"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" required />
          <label>Remember Me</label>
        </div>

        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 w-full py-2 rounded-lg text-white transition-colors duration-300 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              {signup ? "Signing Up..." : "Signing In..."}
            </span>
          ) : (
            signup ? "Sign-Up" : "Sign-In"
          )}
        </button>

        <p className="text-gray-500 mt-2 text-sm">
          {signup ? "Have an account?" : "New to our Platform?"}{" "}
          <span
            className="text-blue-700 hover:underline cursor-pointer"
            onClick={() => setSignUp(!signup)}
          >
            {signup ? "Login" : "Create an account"}
          </span>
        </p>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-blue-500" />
          <p className="px-2 text-sm text-gray-500">or</p>
          <hr className="flex-1 border-blue-500" />
        </div>

        <div className="flex justify-center gap-4">
          <span className="w-10 h-10 bg-red-400/40 rounded-md flex items-center justify-center">
            <Link>
              <Chrome className="text-red-700 w-6 h-6"  onClick={handleGoogleSignIn}/>
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
