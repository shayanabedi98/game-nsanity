import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Container from "@/components/Container";
import Review from "@/components/reviews/Review";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

type Props = { params: { title: string } };

export default async function ReviewContainer({ params }: Props) {
  const session = await getServerSession(authOptions);
  const { title } = params;
  let review;
  let user;
  let signInUser;

  try {
    review = await prisma.gameReview.findFirst({
      where: { title: decodeURI(title) },
      include: {
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
    user = await prisma.user.findFirst({
      where: { name: review?.author, isAdmin: true },
      select: { image: true },
    });
    if (session) {
      signInUser = await prisma.user.findUnique({
        where: { email: session?.user?.email as string },
      });
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="mt-32 mb-20">
      <Container>
        {review && user && (
          <Review
            review={review}
            user={user}
            session={session}
            signInUser={signInUser}
          />
        )}
      </Container>
    </div>
  );
}
