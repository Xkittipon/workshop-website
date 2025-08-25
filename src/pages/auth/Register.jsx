import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { User, LockKeyhole, Eye, EyeClosed } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords Not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const onSubmit = async (data) => {
    const passwordScore = zxcvbn(data.password).score;
    if (passwordScore < 3) {
      toast.warning("Password Not Strong!!!!!");
      return;
    }
    try {
      const res = await axios.post(
        "https://workshop-api-tau.vercel.app/api/register",
        data
      );
      toast.success(res.data);
      navigate("/login");
    } catch (err) {
      const errMsg = err.response?.data?.message || "Registration failed";
      toast.error(errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-[#e5e5e5]">
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg shadow-lg overflow-hidden">
        {/* ฝั่งซ้าย (รูป) */}
        <div
          className="w-full md:w-1/2 flex flex-col justify-center px-8 py-8 bg-cover bg-center min-h-[200px] md:min-h-full"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1513569771920-c9e1d31714af?q=80&w=687&auto=format&fit=crop')",
          }}
        >
          <h1 className="font-bold text-2xl text-center my-4 text-white">
            LOGO
          </h1>
          <p className="text-center text-white mb-4">
            Please enter your credentials to Register
          </p>
        </div>

        {/* ฝั่งขวา (ฟอร์ม) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center bg-white p-8 md:p-16">
          <h1 className="font-bold text-2xl text-center my-4">Register</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto"
          >
            <div className="space-y-4">
              {/* Email */}
              <div>
                <User className="m-1" />
                <input
                  {...register("email")}
                  placeholder="Your email"
                  className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#14213d] focus:border-transparent ${
                    errors.email ? "border-red-400" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <LockKeyhole className="m-1" />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Password"
                    className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#14213d] focus:border-transparent ${
                      errors.password ? "border-red-400" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                  >
                    {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {watch().password?.length > 0 && (
                  <div className="flex w-full mt-2">
                    {Array.from(Array(5).keys()).map((_, index) => (
                      <span className="w-full px-1" key={index}>
                        <div
                          className={`h-2 rounded ${
                            passwordScore <= 2
                              ? "bg-red-400"
                              : passwordScore < 4
                              ? "bg-yellow-400"
                              : "bg-green-400"
                          }`}
                        ></div>
                      </span>
                    ))}
                  </div>
                )}
                {errors.password && (
                  <p className="text-red-700">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <LockKeyhole className="m-1" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                  className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#14213d] focus:border-transparent ${
                    errors.confirmPassword ? "border-red-400" : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-700">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="rounded-md bg-[#14213d] text-white py-2 w-full hover:bg-[#2F3E61] transition duration-200 font-semibold"
              >
                Register
              </button>
              <span className="text-center text-gray-500 text-sm">
                Already have an account?{" "}
                <Link
                  className="text-[#fca311] font-bold underline hover:text-[#FAB53C] transition duration-200"
                  to="/login"
                >
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
