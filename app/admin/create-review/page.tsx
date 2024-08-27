import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Container from "@/components/Container";
import CreateReviewForm from "@/components/forms/CreateReviewForm";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CreateReview() {

  const session = await getServerSession(authOptions)

  let user;
  try {
    user = await prisma.user.findUnique({
      where: {email: session?.user?.email as string}
    })
  } catch (error) {
    console.log(error);
  }

  if (!user?.isAdmin) {
    redirect("/")
  }

  return (
    <Container>
      <CreateReviewForm user={user} />
    </Container>
  );
}
