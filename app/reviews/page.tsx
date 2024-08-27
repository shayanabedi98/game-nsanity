import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Container from "@/components/Container";
import ReviewCard from "@/components/ReviewCard";

export default async function Review() {
  const session = await getServerSession(authOptions);

  let reviews;
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
  } catch (error) {
    console.log(error);
  }

  if (!user?.isAdmin) {
    redirect("/");
  } else {
    try {
      reviews = await prisma.gameReview.findMany({
        include: { comments: true },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <div>
        {reviews?.map((review) => (
          <div key={review.id}>
            <ReviewCard adminControls={user.isAdmin} review={review} />
          </div>
        ))}
      </div>
    </Container>
  );
}
