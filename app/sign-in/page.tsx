import Container from "@/components/Container";
import SignInForm from "@/components/forms/SignInForm";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        priority
        className="object-cover"
        src={"/assets/hero/4.webp"}
        alt="Video game screenshot of scenic view"
        fill
      />
      <div className="absolute">
        <Container>
          <SignInForm />
        </Container>
      </div>
    </div>
  );
}
