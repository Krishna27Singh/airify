import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        formData
      );
      const { token, name, email } = response.data;

      // Save the token to localStorage
      localStorage.setItem("token", token);

      // Set the user in the context
      setUser({ email, name });

      // Navigate to the home page
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const googleAuth = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, "_self");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition duration-300"
        >
          Login
        </button>

        <p className="text-[14px] text-[#2c444e] my-[5px] py-0">or</p>
        <button
          className="w-[230px] h-[40px] rounded-[5px] bg-white shadow-md 
             font-medium text-base mb-5 text-[#2c444e] cursor-pointer 
             flex items-center justify-center gap-2"
          onClick={googleAuth}
        >
          <img
            className="w-[12%]"
            src="/images/google.png"
            alt="google icon"
          />
          <span className="pl-x-10">Sign in with Google</span>
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-500 font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
