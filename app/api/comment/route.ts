import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { comment } = await req.json();

  if (!session) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 400 });
  }

  try {
    const createComment = await prisma.comments.create({
      data: {
        userId: comment.userId,
        text: comment.text,
        gameReviewId: comment.gameReviewId,
      },
    });
    return NextResponse.json(createComment);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not post comment" });
  }
}
