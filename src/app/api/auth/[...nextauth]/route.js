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
            IsAdmin,
          });
          
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
              );
              
              if (isPasswordCorrect) {
                // Check if the provided email matches a specific email
                const isAdminEmail = credentials.email === process.env.email;
                
                // Set isAdmin based on the email condition
              const isAdmin = isAdminEmail ? true : false;

              // Return user object with modified email and isAdmin
              return {
                ...user,
                email: isAdminEmail ? credentials.email : user.email, // If matches, set provided email, else use existing user email
                isAdmin: isAdmin,
              };
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
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

export { handler as GET, handler as POST };
