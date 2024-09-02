"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
        setLoading(false);
      }
      if (data.message.includes("Google")) {
        toast.error("This email is linked to a Google account", {
          duration: 5000,
        });
        setLoading(false);
      }
      if (data.message == "User not found") {
        toast.error("Invalid email");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong, try again later.");
      setShowMessage(false);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center rounded-md bg-neutral-900 px-8 py-4 shadow-lg sm:w-96">
      <form
        onSubmit={handleSubmit}
        className="register flex w-full flex-col items-center justify-center gap-2"
      >
        <p className="text-xl font-semibold">Forgot Password</p>
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
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-2 border-accent pb-4">
          <button className="btn1" type="submit">
            {loading ? <BiLoaderAlt className="animate-spin" /> : "Reset Password"}
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
