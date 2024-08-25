"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please provide an email address");
      return;
    }

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Email sent", { duration: 3000 });
        setShowMessage(true);
      }
      if (data.message.includes("Google")) {
        toast.error("This email is linked to a Google account", {
          duration: 5000,
        });
      }
      if (data.message == "User not found") {
        toast.error("Invalid email");
      }
    } catch (error) {
      toast.error("Something went wrong, try again later.");
      setShowMessage(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-8 py-4 sm:w-96 w-full mx-auto justify-center bg-neutral-900 rounded-md shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="register w-full flex flex-col gap-2 items-center justify-center"
      >
        <p className="text-xl font-semibold">ForgotPassword</p>
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            type="email"
            name="email"
          />
        </div>
        <div className="mt-4 pb-4 w-full flex flex-col gap-2 items-center justify-center border-accent">
          <button className="btn1" type="submit">
            Reset Password
          </button>
          {showMessage && (
            <div className="font-semibold">
              A passwrod reset link has been sent to this email. Be sure to also
              check your spam/junk folders.
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
