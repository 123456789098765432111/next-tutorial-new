import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        // Check if the user exists.
        await connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("User not found!");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Wrong Credentials!");
          }

          // Check if the provided email matches a specific email
          const isAdminEmail = credentials.email === process.env.email;

          // Set isAdmin based on the email condition
          const isAdmin = isAdminEmail ? true : false;

          // Return user object with modified email and isAdmin
          return {
            ...user,
            email: isAdminEmail ? credentials.email : user.email,
            isAdmin: isAdmin,
          };
        } catch (err) {
          throw new Error("Authentication failed");
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    error: "/dashboard/login",
  },
});

export default handler;
