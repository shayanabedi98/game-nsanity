import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { review } = await req.json();
  const session = await getServerSession(authOptions);
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
  } catch (error) {
    console.log(error);
  }
  if (!session || !user?.isAdmin) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 400 });
  }

  try {
    const createReview = await prisma.gameReview.create({
      data: {
        title: review.title,
        author: user.name as string,
        paragraphs: review.paragraphs,
        rating: parseFloat(review.rating),
        thumbnailUrl: review.thumbnailUrl,
      },
    });
    console.log("Created review");

    return NextResponse.json(createReview);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not create review" });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const session = await getServerSession(authOptions);
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
  } catch (error) {
    console.log(error);
  }
  if (!session || !user?.isAdmin) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 400 });
  }

  try {
    const deleteReview = await prisma.gameReview.delete({ where: { id } });
    console.log("Deleted Review");

    return NextResponse.json(deleteReview);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not delete review" });
  }
}

// export async function GET() {
//   const session = await getServerSession(authOptions);
//   let user;
//   try {
//     user = await prisma.user.findUnique({
//       where: { email: session?.user?.email as string },
//     });
//   } catch (error) {
//     console.log(error);
//   }
//   if (!session || !user?.isAdmin) {
//     return NextResponse.json({ message: "Unauthenticated" }, { status: 400 });
//   }

//   try {
//     const reviews = await prisma.gameReview.findMany();
//     return NextResponse.json(reviews);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "Could not get reviews" });
//   }
// }
