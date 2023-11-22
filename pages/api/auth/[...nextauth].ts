import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";


import prisma from "@/app/libs/prismadb"
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions:AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error(`Inavlid Credentials`)
                    }
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    });
                    if (!user || !user?.hashedPassword) {
                        throw new Error(`Inavlid Credentials`)
                    }
    
                    const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
                    
                    if (!isCorrectPassword) {
                        throw new Error(`Inavlid Credentials`)
                    }
    
                    return user;
                }
                catch (error:any) {
                    throw new Error(`Authentication failed: ${error.message}`);
                }
            }
        })
    ],
    debug: process.env.NODE_ENV !== 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)


