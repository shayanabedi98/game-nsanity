"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaGoogle } from "react-icons/fa";

export default function SignInForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleChange = (dataProp: string, value: string) => {
    setData((prev) => ({ ...prev, [dataProp]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("Please complete all missing fields");
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.ok) {
        router.push(callbackUrl);
        router.refresh()
      } else if (res) {
        toast.error("Invalid email or password");
      } else {
        toast.error("An error occurred during sign in");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later")
    }
  };

  return (
    <div className="flex flex-col items-center px-8 py-4 sm:w-96 w-full mx-auto justify-center bg-neutral-900 rounded-md shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="register w-full flex flex-col gap-2 items-center justify-center"
      >
        <p className="text-xl font-semibold">Sign In</p>
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            required
            type="email"
            name="email"
          />
        </div>
        <div className="relative flex w-full flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            required
            type={showPassword ? "text" : "password"}
            name="password"
          />
            <div
            className="absolute bottom-1 right-2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FaEye
            title="show password"
              className={`${
                showPassword ? "text-primary" : "text-neutral-300"
              } text-lg`}
            />
          </div>
        </div>
        <div className="border-b mt-4 pb-4 w-full flex items-center justify-center border-accent">
          <button className="btn1" type="submit">
            Sign In
          </button>
        </div>
      </form>
      <div className="flex-col gap-2 mt-4 w-full flex items-center justify-center border-accent">
        <button onClick={() => signIn("google", {callbackUrl})} className="btn2 gap-2">
          <FaGoogle className="text-2xl" /> Continue with Google
        </button>
        <span>
          Don&apos;t have an account?{" "}
          <Link className="text-primary" href={"/register"}>
            Sign up
          </Link>
        </span>
        <span>
        <Link className="text-primary" href={"/forgot-password"}>
            Forgot Password?
          </Link>
        </span>
      </div>
    </div>
  );
}
