import { google } from "googleapis";
import { NextResponse } from "next/server";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

export async function GET() {
  try {
    const res = await youtube.channels.list({
      part: ["statistics"],
      id: [process.env.YOUTUBE_CHANNEL_ID as string],
    });

    const subscriberCount = res.data.items?.[0]?.statistics?.subscriberCount;

    return NextResponse.json({ subscriberCount });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not get youtube stats" });
  }
}
