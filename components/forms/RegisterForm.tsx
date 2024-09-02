"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaGoogle } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";

export default function RegisterForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (dataProp: string, value: string) => {
    setData((prev) => ({ ...prev, [dataProp]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true)
    if (data.name && data.password && data.name) {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ data }),
        });
        if (res.ok) {
          setData({ name: "", password: "", email: "" });
          toast.success("Created account");
          setLoading(false)
          router.push("/sign-in");
        } else {
          const errorData = await res.json();
          if (errorData.message === "User already exists") {
            toast.error("User already exists. Please use a different email.");
            setLoading(false)
          }
        }
      } catch (error) {
        toast.error("Something went wrong, please try again later");
        setLoading(false)
      }
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center rounded-md bg-neutral-900 px-8 py-4 shadow-lg sm:w-96">
      <form
        onSubmit={handleSubmit}
        className="register flex w-full flex-col items-center justify-center gap-2"
      >
        <p className="text-xl font-semibold">Sign Up</p>
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input
            autoComplete="off"
            required
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            type="text"
            name="name"
          />
        </div>
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
            minLength={10}
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
        <div className="mt-4 flex w-full items-center justify-center border-b border-accent pb-4">
          <button className="btn1" type="submit">
            {loading ? <BiLoaderAlt className="animate-spin" /> : "Sign Up"}
          </button>
        </div>
      </form>
      <div className="mt-4 flex w-full flex-col items-center justify-center gap-2 border-accent">
        <button onClick={() => signIn("google")} className="btn2 gap-2">
          <FaGoogle className="text-2xl" /> Continue with Google
        </button>
        <span>
          Already have an account?{" "}
          <Link className="text-red-500" href={"/sign-in"}>
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
}
