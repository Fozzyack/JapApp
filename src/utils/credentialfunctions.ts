
import type { Pool } from 'pg';
import bcrypt from 'bcrypt';

export default function credential_adapter(client: Pool) {
    return {
        async validateCredentials(username: string, password: string) {
            try {
                const sql = `SELECT * FROM accounts WHERE username = $1`;

                const account = await client.query(sql, [username])
                if (account.rows.length !== 1) {
                    return {
                        state: -1,
                        error: 'Incorrect Username or Password'
                    }
                }
                const checkHash = await bcrypt.compare(password, account.rows[0].pwd_hash)

                if (!checkHash) {
                    return {
                        state: -1,
                        error: 'Incorrect Username or Password'
                    }
                }

                return {
                    state: 1,
                    error: '',
                    userId: account.rows[0].userId
                }
            } catch (error: any) {
                console.log(error.message)
            }

        },

        async getUserById(id: number) {
            try {
                const sql = `select * from users where id  = $1`
                const user = await client.query(sql, id)
                return user.rows[0]
        } catch (error: any) {
                console.log(error.message)
            }

        },
    }

}