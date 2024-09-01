"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      router.push("/forgot-password");
    }
  }, [token, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!password) {
      toast.error("Please provide an email address");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Password reset successful");
        setTimeout(() => router.push("/sign-in"), 2000);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center px-8 py-4 sm:w-96 w-full mx-auto justify-center bg-neutral-900 rounded-md shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="register w-full flex flex-col gap-2 items-center justify-center"
      >
        <p className="text-xl font-semibold">Update Password</p>
        <div className="flex w-full flex-col gap-1 relative">
          <label htmlFor="password">New Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            minLength={8}
            maxLength={16}
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
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="password">Confirm Password</label>
          <input
            minLength={8}
            maxLength={16}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
            type={showPassword ? "text" : "password"}
            name="password"
          />
        </div>
        <div className="mt-4 pb-4 w-full flex flex-col gap-2 items-center justify-center border-accent">
          <button className="btn1" type="submit">
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
