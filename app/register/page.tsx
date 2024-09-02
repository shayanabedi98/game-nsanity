import Container from "@/components/Container";
import RegisterForm from "@/components/forms/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        priority
        className="object-cover max-sm:object-[-400px]"
        src={"/assets/hero/2.webp"}
        alt="Video game screenshot of scenic view"
        fill
      />
      <div className="absolute w-full">
        <Container>
          <RegisterForm />
        </Container>
      </div>
    </div>
  );
}
