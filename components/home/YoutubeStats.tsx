"use client";

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

  return <div>
    Page currently has {subscriberCount} Subs!
  </div>;
}
