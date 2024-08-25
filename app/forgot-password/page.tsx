import Container from "@/components/Container";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function ForgotPassword() {

    const session = await getServerSession(authOptions)

    if (session) {
        redirect("/")
    }

    return <Container>
        <ForgotPasswordForm />
    </Container>
}