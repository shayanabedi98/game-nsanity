import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Container from "@/components/Container";
import ReviewCard from "@/components/reviews/ReviewCard";
import Link from "next/link";
import Hero from "@/components/Hero";

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
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="mb-32">
      <Hero content="REVIEWS" image="/assets/hero/1.webp" />
      <Container>
        <div className="flex mt-32 flex-col gap-14">
          {user.isAdmin && (
            <Link className="btn1" href={"/admin/create-review"}>
              Create Review
            </Link>
          )}
          {reviews?.map((review) => (
            <div key={review.id}>
              <ReviewCard adminControls={user.isAdmin} review={review} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
