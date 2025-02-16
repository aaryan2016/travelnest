import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { db } from "@/server/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            async authorize(credentials: any): Promise<any> {
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
                        throw new Error('No user with this email')
                    }

                    // const isPasswordCorrect = user.password === credentials.password
                    // if (isPasswordCorrect) {
                    //     return user
                    // }
                    // // return null
                    // throw new Error("Incorrect Password")

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if (isPasswordCorrect) {
                        return user
                    }
                    throw new Error("Incorrect Password")
                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                } catch (err: any) {
                    throw new Error(err)
                }
            }
        })
    ],
    adapter: PrismaAdapter(db),
    callbacks: {
        async jwt({ token, user }) {
            // console.log('JWT Callback - user:', user);
            if (user) {
                token._id = user.id
                token.username = user.username
            }
            // console.log('JWT Callback - token:', token);  // Log token to check if _id is assigned
            return token
        },
        async session({ session, token }) {
            // console.log('Session Callback - token:', token);  // Log token data
            if (token) {
                session.user._id = token._id
                session.user.username = token.username
            }
            // console.log('Session Callback - session:', session);  // Log session to check if _id is assigned
            return session
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