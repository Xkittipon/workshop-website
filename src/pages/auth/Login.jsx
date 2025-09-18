import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate, Link } from "react-router-dom";
import { User, LockKeyhole, Eye, EyeClosed } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success("Welcome Back");
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e5e5e5] px-4 py-6">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-lg shadow-lg overflow-hidden">
        {/* ฝั่งซ้าย (มือถือ = ด้านบน, Desktop = ซ้าย) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-8 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1513569771920-c9e1d31714af?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0')]">
          <h1 className="font-bold text-2xl text-center my-4 text-white">
            LOGO
          </h1>
          <p className="text-center text-white mb-4">
            Please enter your credentials to login
          </p>
        </div>

        {/* ฝั่งขวา */}
        <div className="w-full md:w-1/2 flex flex-col justify-center bg-white py-12 px-8 md:py-16 md:px-12">
          <div>Admin: admin_test@gmail.com</div>
          <div>Password: 12345678</div>
          <h1 className="font-bold text-3xl font-mono text-center my-4">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="space-y-4">
              <div>
                <User className="m-1" />
                <input
                  type="email"
                  name="email"
                  onChange={handleOnChange}
                  value={form.email}
                  placeholder="Your email"
                  className="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#14213d]"
                />
              </div>
              <div>
                <div className="relative">
                  <LockKeyhole className="m-1" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleOnChange}
                    value={form.password}
                    placeholder="Password"
                    className="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#14213d]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-10 text-sm text-gray-600"
                  >
                    {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="rounded-md bg-[#fca311] text-white py-2 w-full hover:bg-[#FAB53C] transition duration-200 font-semibold"
              >
                Login
              </button>
              <span className="block text-center text-gray-500 text-sm">
                don’t have an account?{" "}
                <Link
                  className="text-[#14213D] font-bold underline hover:text-[#2F3E61] transition duration-200"
                  to="/register"
                >
                  register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
