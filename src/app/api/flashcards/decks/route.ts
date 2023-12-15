import pool from "@/utils/db"
import { options } from "../../auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
export const dynamic = 'force-dynamic'
import { Session } from "next-auth"
interface ExtendedSession extends Session {
    user: {
      id?: string | null | undefined;
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    };
  }

export async function GET(req: Request) {
    const session = await getServerSession(options) as ExtendedSession
    const sql = `select * from decks
                JOIN deck_connector ON decks.id=deck_connector."deckId" where "userId" = $1`
        
    const decks = await pool.query(sql, [session?.user?.id])
    
    return Response.json(decks.rows);
}