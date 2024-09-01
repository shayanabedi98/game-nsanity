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
        className="object-cover"
        src={"/assets/hero/7.webp"}
        alt="Video game screenshot of scenic view"
        fill
      />
      <div className="absolute">
        <Container>
          <ForgotPasswordForm />
        </Container>
      </div>
    </div>
  );
}
