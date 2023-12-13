import type { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from "next-auth/providers/github";
import PostgresAdapter from "@/utils/adapter";
import pool from '@/utils/db';
import EmailProvider from "next-auth/providers/email"
import { AdapterUser } from "next-auth/adapters";

interface ExtendedSessionUser {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    id?: string | null | undefined;
}

export const options: NextAuthOptions = {
    adapter: PostgresAdapter(pool),
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            httpOptions: {
                timeout: 40000
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            httpOptions: {
                timeout: 40000
            }
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        }),

    ],
    callbacks: {
        async session({ session, user } : {session: Session, user: AdapterUser}) {
            if (user) {
                (session.user as ExtendedSessionUser).id =  user.id
            }
            
            return session
          }
    }
    // pages: {
    //     signIn: '/auth/signin'
    // }
}