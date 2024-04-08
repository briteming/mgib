import GitHubProvider from "next-auth/providers/github";
import type { AuthOptions } from "next-auth";

export const options: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: { scope: "public_repo" },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && user.id) token.id = user.id;
      if (account && account.access_token)
        token.access_token = account.access_token;
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token as string;
      session.user.id = token.id as string;
      return session;
    },
  },
};
