import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from '@/lib/prismaDB'
import { compare } from "bcrypt";

export const NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/authentication'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                emailOrUsername: {
                    label: "ایمیل یا نام کاربری",
                    type: 'text',
                    placeholder: "ایمیل خود را وارد کنید"
                },
                password: {
                    label: "رمزعبور",
                    type: 'password',
                    placeholder: "رمز عبور خود را وارد کنید"
                }
            },
            async authorize(credentials) {
                if (!credentials?.emailOrUsername || !credentials?.password) return null;

                const existingUserByEmail = await prisma.user.findUnique({
                    where: { email: credentials?.emailOrUsername }
                });

                if (!existingUserByEmail) {
                    const existingUserByUsername = await prisma.user.findUnique({
                        where: { username: credentials?.emailOrUsername }
                    });

                    if (!existingUserByUsername) return null;

                    const passwordIsTrue = await compare(credentials.password, existingUserByUsername.password)

                    if (!passwordIsTrue) return null;

                    const user = {
                        id: existingUserByUsername.id,
                    };

                    return user;
                };

                const passwordIsTrue = await compare(credentials.password, existingUserByEmail.password)

                if (!passwordIsTrue) return null;

                const user = {
                    id: existingUserByEmail.id,
                };

                return user;
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                }
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                }
            }
        }
    }
}
