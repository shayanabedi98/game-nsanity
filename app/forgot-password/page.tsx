import Container from "@/components/Container";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ForgotPassword() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        priority
        className="max-md:hidden object-cover"
        src={"/assets/hero/13.jpg"}
        alt="Video game screenshot of scenic view"
        width={1920}
        height={1080}
        quality={90}
      />
      <div className="absolute w-full">
        <Container>
          <ForgotPasswordForm />
        </Container>
      </div>
    </div>
  );
}
