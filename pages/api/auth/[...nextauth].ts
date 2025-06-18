import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions } from "next-auth";
import { compare } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { getUserForAuth } from "@/api/services/User";
import dbConnect from "@/lib/dbContext";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Fjalëkalimi", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await getUserForAuth(credentials!.email!);

        if (!user) throw new Error("Email-i nuk ekziston");
        const isValid = await compare(credentials!.password, user.password!);
        if (!isValid) throw new Error("Fjalëkalimi është gabim");
        if (!user._id) throw new Error("Përdoruesi nuk ka _id");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as {
          id: string;
          name?: string | null;
          email?: string | null;
          role?: string;
        };
        token.id = u.id;
        token.name = u.name;
        token.email = u.email;
        token.role = u.role || "user";
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...(session.user || {}),
        id: token.id as string,
        name: token.name,
        email: token.email,
        role: token.role as string,
      };
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },
};

export default NextAuth(authOptions);
