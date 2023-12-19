import pool from "@/utils/db"
import { Session, getServerSession } from "next-auth"
import { options } from "../../auth/[...nextauth]/options"


interface ExtendedSession extends Session {
    user: {
        id?: number | null | undefined,
        name?: string | null | undefined,
        email?: string | null | undefined,
        image?: string | null | undefined,
    } | undefined

}
// Client makes a fetch request. Client removes the card from the deck and sends the id to this route to update the next review
export async function POST(req: Request) {
    try {
        //Times
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;

        //const next-study delay
        let next_review_delay = -1

        const session = await getServerSession(options) as ExtendedSession;
        const last_delay_sql = `SELECT * FROM flashcard_connector WHERE "userId"=$1 AND "flashcardId"=$2`;

        const data = await req.json();

        const card_connector = await pool.query(last_delay_sql, [session?.user?.id, data.card_id]);

        switch (card_connector.rows[0].last_delay) {
            case 0:
                next_review_delay = day
                break
            case 1:
                next_review_delay = day * 5
                break
            case 2:
                next_review_delay = day * 10
                break
            case 3:
                next_review_delay = day * 15
                break
            case 4:
                next_review_delay = day * 30
                break
            case 5:
                next_review_delay = day * 30 * 2
                break
        }




        return Response.json({ msg: 'nice' });

    } catch (error) {
        return Response.status(500).json({msg: error.message})
    }

}