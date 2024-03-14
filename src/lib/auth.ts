import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleAuthProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createJwtToken } from "@/lib/functions/create-jwt-token";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/dummy/login",
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
          where: { OR: [{ email }, { name: username }] },
        });

        if (!isUserExist) {
          // hash password
          const slat = await bcrypt.genSalt(10);
          const hash_password = await bcrypt.hash(password, slat);

          const createUser = await prisma.user.create({
            data: {
              email,
              name: username,
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
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
