import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAccount, getCurrentUser } from "../Appwrite/Auth";
import { useForm } from "react-hook-form";
import { login } from '../store/authSlice'
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
export function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, seterror] = useState("");
  async function create(data) {
    seterror("");
    try {
      const session = await createAccount(data);
      if (session) {
        const userData = await getCurrentUser();
        if (userData) {
          dispatch(login(userData ))
          navigate('/');
        }
      }
    }
    catch (err) {
      seterror(err.message)
    }
  }
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md animate-fade-up rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-lg font-bold text-white">B</div>
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Already have an account?
          <Link to="/login" className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline">
            Sign In
          </Link>
        </p>
        {error && (
          <p className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
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
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}