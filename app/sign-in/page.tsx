import Container from "@/components/Container";
import SignInForm from "@/components/forms/SignInForm";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return (
    <Container>
      <SignInForm />
    </Container>
  );
}
