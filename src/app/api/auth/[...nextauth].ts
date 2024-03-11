import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleAuthProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createJwtToken } from "@/lib/functions/create-jwt-token";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const handler = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/page.tsx",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password, username } = credentials as {
          email: string;
          username: string;
          password: string;
        };

        if ((!email && !username) || !password) {
          throw new Error("Invalid credential");
        }

        const isUserExist: any = await prisma.user.findFirst({
          where: { OR: [{ email }, { username }] },
        });

        if (!isUserExist) {
          // hash password
          const slat = await bcrypt.genSalt(10);
          const hash_password = await bcrypt.hash(password, slat);

          const createUser = await prisma.user.create({
            data: {
              email,
              username,
              password: hash_password,
            },
          });

          const token = createJwtToken(createUser.id);

          return { token };
        }

        // if user is already exist thean check password
        const isPasswordMatch = await bcrypt.compare(
          password,
          isUserExist.password
        );
        if (!isPasswordMatch) {
          throw new Error("Invalid Password");
        }

        const token = createJwtToken(isUserExist.id);

        return { token } as any;
      },
    }),
    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
    }),
    GoogleAuthProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (!token.email) {
        return {};
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
