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


        let next_review_delay = -1
        const session = await getServerSession(options) as ExtendedSession;
        const last_delay_sql = `SELECT * FROM flashcard_connector WHERE "userId"=$1 AND "flashcardId"=$2`;
        const update_sql = `UPDATE flashcard_connector SET next_review=$1, last_delay=$2 WHERE "userId"=$3 AND "flashcardId"=$4 RETURNING *`

        const data = await req.json();

        const card_connector = await pool.query(last_delay_sql, [session?.user?.id, data.card_id]);
        let update_delay = card_connector.rows[0].last_delay
        let same_delay = card_connector.rows[0].last_delay

        if (data.incorrect) {
            if (card_connector.rows[0].last_delay === 0) {
                same_delay = 0
            } else {
                same_delay = card_connector.rows[0].last_delay - 1
            }
        } else {
            update_delay ++
        }
        console.log(same_delay)
        switch (same_delay) {
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
            default:
                next_review_delay = day * 30 * 2
                break
        }

        const newCard = await pool.query(update_sql, [new Date(Date.now() + next_review_delay), update_delay, session.user?.id, data.card_id])
        console.log(newCard.rows[0])

        return Response.json({ msg: 'Updated Successfully' });

    } catch (error) {
        return new Response ("There was an Error" , {
            status: 500,
            headers: {'Content-Type' : 'application/json'}
        })
    }

}