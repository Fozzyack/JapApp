import { options } from "@/app/api/auth/[...nextauth]/options"
import pool from "@/utils/db"
import { Session, getServerSession } from "next-auth"

interface ExtendedSession extends Session {
    user: {
        id?: string | null | undefined;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    };
}
export async function GET(req: Request, { params }: { params: { deckId: number } }) {

    const session = await getServerSession(options) as ExtendedSession
    const new_cards_sql = `SELECT flashcards.id, question, image_header, image_file, "deckId" FROM flashcards JOIN flashcard_connector ON flashcards.id=flashcard_connector."flashcardId" JOIN flashcard_images ON flashcards.id=flashcard_images."cardId" WHERE "userId"=$1 AND "deckId"=$2 AND next_review IS NULL ORDER BY card_order ASC LIMIT 20`
    const prev_studied_sql = `SELECT flashcards.id, question, image_header, image_file, "deckId" FROM flashcards JOIN flashcard_connector ON flashcards.id=flashcard_connector."flashcardId" JOIN flashcard_images ON flashcards.id=flashcard_images."cardId" WHERE "userId"=$1 AND "deckId"=$2 AND next_review<NOW() ORDER BY next_review ASC LIMIT 20`
    const cards_new = await pool.query(new_cards_sql, [session?.user?.id, params.deckId])
    const cards_revise = await pool.query(prev_studied_sql, [session?.user?.id, params.deckId])

    for (let i = 0; i < cards_new.rows.length; i++) {
        const text_sql = `SELECT position, text_header, content FROM flashcard_texts JOIN flashcard_connector ON flashcard_texts."cardId"=flashcard_connector."flashcardId" WHERE "userId"=$1 AND "cardId"=$2 `
        const texts = await pool.query(text_sql, [session.user.id, cards_new.rows[i].id])
        cards_new.rows[i].text = texts.rows

        const audio_sql = `SELECT audio_header, audio_file FROM flashcard_audios JOIN flashcard_connector ON flashcard_audios."cardId"=flashcard_connector."flashcardId" WHERE "userId"=$1 AND "cardId"=$2 `
        const audios = await pool.query(audio_sql, [session.user.id, cards_new.rows[i].id])
        cards_new.rows[i].audio = audios.rows

    }
    for (let i = 0; i < cards_revise.rows.length; i++) {
        const text_sql = `SELECT position, text_header, content FROM flashcard_texts JOIN flashcard_connector ON flashcard_texts."cardId"=flashcard_connector."flashcardId" WHERE "userId"=$1 AND "cardId"=$2 `
        const texts = await pool.query(text_sql, [session.user.id, cards_revise.rows[i].id])
        cards_revise.rows[i].text = texts.rows

        const audio_sql = `SELECT audio_header, audio_file FROM flashcard_audios JOIN flashcard_connector ON flashcard_audios."cardId"=flashcard_connector."flashcardId" WHERE "userId"=$1 AND "cardId"=$2 `
        const audios = await pool.query(audio_sql, [session.user.id, cards_revise.rows[i].id])
        cards_revise.rows[i].audio = audios.rows
        

    }

    const payload = {
        new_cards: cards_new.rows,
        revise_cards: cards_revise.rows
    }
    console.log(payload)
    console.log(payload.new_cards[0])
    return Response.json(payload)
}