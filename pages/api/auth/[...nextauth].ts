import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { compare } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { getUserForAuth } from "@/api/services/User";

export default NextAuth({
   adapter: MongoDBAdapter(clientPromise),
   session: { strategy: "jwt" },
   secret: process.env.NEXTAUTH_SECRET,

   providers: [
      CredentialsProvider({
      name: "credentials",
      credentials: {
         email:    { label: "Email", type: "email"    },
         password: { label: "Fjalëkalimi", type: "password" },
      },
      async authorize(credentials) {
         console.log("→ authorize got creds:", credentials);
         const user = await getUserForAuth(credentials!.email!);
         console.log("→ authorize got user:", user);

         if (!user) throw new Error("Email-i nuk ekziston");
         console.log("   comparing plain:", credentials.password,
              " vs hash:", user.password);
         const isValid = await compare(credentials!.password, user.password!);
         console.log("   compare result:", isValid);

         if (!isValid) throw new Error("Fjalëkalimi është gabim");
         return {
            id:    user._id.toString(),
            name:  user.name,
            email: user.email,
            role:  user.role,
         };
      },
      }),
   ],

   callbacks: {
      async jwt({ token, user }) {
      if (user) {
         token.id   = user.id;
         token.name = user.name;
         token.role = user.role;
      }
      return token;
      },
      async session({ session, token }) {
      if (session.user) {
         session.user.id   = token.id   as string;
         session.user.name = token.name as string;
         session.user.role = token.role as string;
      }
      return session;
      },
   },

   pages: {
      signIn: "/sign-in",
   },
});
