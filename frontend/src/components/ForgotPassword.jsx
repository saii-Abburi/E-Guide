import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import  auth  from "../components/firebase";
import toast, { Toaster } from "react-hot-toast";  

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
    .then(() => {
      toast.success("Password reset email sent");
    })
    .catch((error) => {
      toast.error(error.message);
    });
    setEmail("");
  };
  const handleBackClick = () => {
    navigate("/login");
  };
  return  (
    <div className="flex  justify-center items-center h-[100vh] bg-slate-50">
      <Toaster />
      <div className="p-4 bg-white flex flex-col items-center">
        <div className="flex items-center justify-center relative w-[100%]">
          <ArrowLeft
            className="absolute left-0 text-xl  cursor-pointer hover:bg-slate-100/60 w-10 h-10 p-2  rounded-full"
            onClick={handleBackClick}
          />
          <p className="text-md font-medium">E-Guide</p>
        </div>
        <div>
          <form
            className="w-[300px] p-6 rounded-lg bg-white drop-shadow-sm flex flex-col "
            onSubmit={handleSubmit}
          >
            <h1 className="text-xl text-blue-700  font-semibold">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-500  ">
              Enter Your Mail to get code
            </p>
            <input
              required
              type="email"
              placeholder="Enter Your Mail"
              className="border-2 w-[100%] h-5 pl-2 pt-4 pb-4 placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <button className="bg-blue-500 hover:bg-blue-700 transition-colors duration-400Z w-full  pt-2 pb-2 rounded-lg text-white mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
