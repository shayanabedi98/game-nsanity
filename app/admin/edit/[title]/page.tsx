import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Container from "@/components/Container";
import EditReviewForm from "@/components/forms/EditReviewForm";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function EditReview({
  params,
}: {
  params: { title: string };
}) {
  const session = await getServerSession(authOptions);
  const cloudinaryPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const { title } = params;
  let user;
  let reviewData;

  try {
    user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
    reviewData = await prisma.gameReview.findFirst({
      where: { title: decodeURI(title) },
    });
  } catch (error) {
    console.log(error);
  }

  if (!user?.isAdmin) {
    redirect("/");
  }

  return (
    <div className="mt-32 mb-32">
      <Container>
        {reviewData && cloudinaryPreset && (
          <EditReviewForm
            cloudinaryPreset={cloudinaryPreset}
            reviewData={reviewData}
          />
        )}
      </Container>
    </div>
  );
}
