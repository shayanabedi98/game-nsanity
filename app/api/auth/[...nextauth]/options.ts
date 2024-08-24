import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";

const CustomPrismaAdapter = PrismaAdapter(prisma) as any;

export const authOptions: AuthOptions = {
  adapter: {
    ...CustomPrismaAdapter,
    createUser: (data) => {
      return prisma.user.create({
        data: {
          ...data,
          isAdmin: false, // Set isAdmin to false for all new Google users
        },
      });
    },
  }, // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johnsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });        

        if (!user) {
          return null;
        }

        if (user.hashedPassword) {
          const isPasswordValid = await compare(
            credentials.password,
            user.hashedPassword
          );

          if (!isPasswordValid) {
            return null;
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
