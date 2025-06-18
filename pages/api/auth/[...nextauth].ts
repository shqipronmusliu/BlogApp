import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { compare } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { getUserForAuth } from "@/api/services/User";
import dbConnect from "@/lib/dbContext";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";


export default NextAuth({
   adapter: MongoDBAdapter(clientPromise),
   session: { strategy: "jwt" },
   secret: process.env.NEXTAUTH_SECRET,

   jwt: {
      encryption: false,
   },

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
         email:    { label: "Email", type: "email"    },
         password: { label: "Fjalëkalimi", type: "password" },
      },
      async authorize(credentials) {
         await dbConnect();
         const user = await getUserForAuth(credentials!.email!);

         if (!user) throw new Error("Email-i nuk ekziston");
         const isValid = await compare(credentials!.password, user.password!);
         console.log("compare result:", isValid);

         if (!isValid) throw new Error("Fjalëkalimi është gabim");
         return {
            id:    user._id.toString(),
            name:  user.name,
            email: user.email,
            role:  user.role || 'user',
         };
      },
      }),
   ],

   callbacks: {
      async jwt({ token, user }) {
      if (user) {
         token.id   = user.id;
         token.name = user.name;
         token.email = user.email;
         token.role = user.role || "user";
      }
      return token;
      },
      async session({ session, token }) {
      session.user = {
         id: token.id,
         name: token.name,
         email: token.email,
         role: token.role,
      };
      return session;
      }
   },

   pages: {
      signIn: "/sign-in",
   },
});
