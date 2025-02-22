import type { NextAuthOptions, Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { db } from "@/server/db";
import { type JWT } from "next-auth/jwt";

// Define a type for the session
interface CustomSession {
    // user: {
    //     _id: string;
    //     username: string;
    //     email?: string | null;
    //     name?: string | null;
    // };
    user: User;
    expires: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                identifier: {
                    label: "Email or Username",
                    type: "text",
                    placeholder: "email@example.com or username"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },

            async authorize(credentials: Record<"identifier" | "password", string> | undefined): Promise<User | null> {
                if (!credentials?.identifier || !credentials?.password) {
                    throw new Error('Missing credentials');
                }

                try {
                    const user = await db.user.findFirst({
                        where: {
                            OR: [
                                { email: credentials.identifier },
                                { username: credentials.identifier }
                            ]
                        }
                    })
                    if (!user) {
                        throw new Error('No user found with this email or username');
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if (!isPasswordCorrect) {
                        throw new Error('Invalid password');
                    }

                    return user;
                } catch (error) {
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    }
                    throw new Error('An unexpected error occurred');
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                return {
                    ...token,
                    _id: user._id,
                    username: user.username
                };
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }): Promise<CustomSession> {
            return {
                ...session,
                expires: session.expires, // Add the missing 'expires' property
                user: {
                    ...session.user,
                    id: token._id!,
                    username: token.username!
                }
            };
        }
    },
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.AUTH_SECRET,
}