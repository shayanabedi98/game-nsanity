"use client";

import { useState } from "react";

export default function ContactForm({ accessCode }: { accessCode: string }) {
  const [result, setResult] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", `${accessCode}`);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="px-8 py-4 w-full register mx-auto flex flex-col items-center justify-center gap-8 bg-bg max-md:rounded-b-md md:rounded-l-md shadow-lg">
      <h2 className="text-2xl font-semibold">
        For all inquiries, fill out this contact form and we will get back to
        you shortly.
      </h2>
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-2">
        <input type="hidden" name="from_name" value="GAME NSANITY USER" />

        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input placeholder="John Doe" type="text" name="name" required />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            placeholder="coolguy@johndoe.com"
            type="email"
            name="email"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Message</label>
          <textarea
            className="min-h-40"
            placeholder="Your message here..."
            name="message"
            required
          ></textarea>
        </div>
        <div className="mt-4 pb-4 w-full flex items-center justify-center border-accent">
          <button className="btn3" type="submit">
            Send
          </button>
        </div>
      </form>
      <span>{result}</span>
    </div>
  );
}
