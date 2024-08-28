import Container from "@/components/Container";
import Review from "@/components/reviews/Review";
import prisma from "@/lib/db";

type Props = { params: { title: string } };

export default async function ReviewContainer({ params }: Props) {
  const { title } = params;
  let review;
  let user;

  try {
    review = await prisma.gameReview.findFirst({
      where: { title: decodeURI(title) },
      include: { comments: true },
    });
    user = await prisma.user.findFirst({
      where: { name: review?.author, isAdmin: true },
      select: { image: true },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <Container>
      {review && user && <Review review={review} user={user} />}
    </Container>
  );
}
