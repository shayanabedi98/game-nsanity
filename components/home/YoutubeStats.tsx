"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from "react";

export default function YoutubeStats() {
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchSubs() {
      try {
        const res = await fetch("/api/youtube-stats");
        const data = await res.json();
        setSubscriberCount(Number(data.subscriberCount));
      } catch (error) {
        setSubscriberCount(null);
      }
    }

    fetchSubs();
  }, []);

  return (
    <div className="text-red-500 font-extrabold">
      {subscriberCount ? (
        subscriberCount
      ) : (
        <AiOutlineLoading3Quarters className="animate-spin" />
      )}
    </div>
  );
}
