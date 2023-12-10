import type { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import PostgresAdapter from "@/utils/customadapter";
import credential_adapter from "@/utils/credentialfunctions";
import pool from '@/utils/db';

export const options: NextAuthOptions = {
    adapter: PostgresAdapter(pool),
    providers: [
        CredentialsProvider ({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'Username'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                }
            },
            async authorize(credentials) {
                const cred_adp =  credential_adapter(pool)
                const result = await cred_adp.validateCredentials(credentials?.username as string, credentials?.password as string);

                if(result?.state === -1) {
                    return null
                }
                
                const user = await cred_adp.getUserById(result?.userId);

                return user;
            }
        }),
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
        
    ],
    pages: {
        signIn: '/auth/signin'
    }
}