import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getCurrentUser, Login as Authlogin } from "../Appwrite/Auth";
import { login } from '../store/authSlice'
import { useState } from "react";
import { useDispatch } from "react-redux";
export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, seterror] = useState("");
  const { register, handleSubmit } = useForm();
  async function LoginSuccess(data) {
    seterror("");
    try {
      console.log("Login form submitted");
      const session = await Authlogin(data);
      console.log("Session created:", session);
      const userdata = await getCurrentUser();
      if (userdata) {
        dispatch(login(userdata));
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      seterror(err.message);
    }
  }
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md animate-fade-up rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-lg font-bold text-white">B</div>
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">Welcome back</h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Don't have an account?
          <Link to="/signup" className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline">
            Sign Up
          </Link>
        </p>
        {error && (
          <p className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(LoginSuccess)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  )
}