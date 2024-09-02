"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContentWarning() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasVerified = localStorage.getItem("understood");
    if (!hasVerified) {
      setShow(true);
    }
  }, []);

  const handleVerification = (understood: boolean) => {
    if (understood) {
      localStorage.setItem("understood", "true");
      setShow(false);
    } else {
      router.push("https://www.google.com");
    }
  };

  if (!show) {
    return null;
  } else {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
        <div className="flex flex-col gap-4 items-center bg-black bg-opacity-85 p-6 rounded-md shadow-black shadow-sm">
          <h1 className="text-4xl font-semibold">Content Warning</h1>
          <p className="text-lg text-center">
            This site contains mature humor, including strong language and jokes
            that some may find offensive.
          </p>
          <div className="flex gap-4 w-full sm:w-3/4">
            <button onClick={() => handleVerification(true)} className="btn3">
              I understand
            </button>
            <button onClick={() => handleVerification(false)} className="btn2">
              I want to leave
            </button>
          </div>
        </div>
      </div>
    );
  }
}
