import { Session, getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import pool from "@/utils/db";

interface ExtendedSession extends Session {
    user: {
      id?: string | null | undefined;
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    };
  }


export async function POST(req: Request) {
    const session = await getServerSession(options) as ExtendedSession;
    const data = await req.json();
    const sql = `SELECT decks.name, decks.description, author, premade, last_review, next_review FROM decks JOIN  deck_connector ON decks.id=deck_connector."deckId" WHERE decks.id=$1 AND deck_connector."userId"=$2`
    const result = await pool.query(sql, [data.deckId, session?.user?.id]);
    return Response.json(result.rows[0]);
}