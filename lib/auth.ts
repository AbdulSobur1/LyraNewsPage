import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getDb } from "@/db";
import { schema } from "@/db";
import { eq } from "drizzle-orm";
import { verifyPassword } from "./password";

declare module "next-auth" {
  interface User {
    role?: "admin" | "user";
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: "admin" | "user";
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: "admin" | "user";
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        // 1. Check admin credentials first
        if (
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Admin", email, role: "admin" };
        }

        // 2. Check against DB users
        const db = getDb();
        if (db) {
          try {
            const [user] = await db
              .select()
              .from(schema.users)
              .where(eq(schema.users.email, email.toLowerCase().trim()))
              .limit(1);

            if (user && (await verifyPassword(password, user.hashedPassword))) {
              return {
                id: String(user.id),
                name: user.name,
                email: user.email,
                role: "user",
              };
            }
          } catch {
            // DB not available
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "admin" | "user" | undefined;
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth: session }) {
      // Allow all authenticated users, not just admin
      return !!session?.user;
    },
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
});
