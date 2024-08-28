import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Container from "@/components/Container";
import ReviewCard from "@/components/reviews/ReviewCard";

export default async function Reviews() {
  const session = await getServerSession(authOptions);

  let reviews;
  let user: any;

  if (session) {
    try {
      user = await prisma.user.findUnique({
        where: { email: session?.user?.email as string },
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    user = {
      isAdmin: false,
    };
  }

  try {
    reviews = await prisma.gameReview.findMany({
      include: { comments: true },
    });
  } catch (error) {
    console.log(error);
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
