import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const removeImage = async (publicId: string) => {
  try {
    const res = await cloudinary.v2.uploader.destroy(publicId);
    console.log(`image ${publicId} removed`);
  } catch (error) {
    console.log("whoops", error);
  }
};

export async function POST(req: Request) {
  const { publicId: public_id } = await req.json();
  await removeImage(public_id);

  return NextResponse.json({ message: "Image removed" });
}
