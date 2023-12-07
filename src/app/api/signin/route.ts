import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/models/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try {
        const { email, name, password } = await req.json()
        const email_check = await pool.query('SELECT * FROM users WHERE email=$1', [email])
        if (email_check.rows.length > 0) {
            return NextResponse.json({
                msg: 'Email has already been registered'
            }, { status: 401 });
        }

        const salt_rounds = 10
        const salt = await bcrypt.genSalt(salt_rounds);
        const pwd_hash = await bcrypt.hash(password, salt)

        const new_user = await pool.query('INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *', [email, name, pwd_hash]);

        console.log("New User Created -- Sign In Route", new_user.rows[0].name);

        return NextResponse.json({
            msg: 'User Created Successfully'
        })

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ msg: 'error', error })
    }
}