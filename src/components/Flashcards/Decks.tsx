'use client'
import Link from 'next/link';
import React from 'react'

interface Deck {
    id: number;
    name: string;
    next_review: string;
  }

const Decks = () => {

    const [deckInfo, setDeckInfo] = React.useState([])
    const getDecks = async () => {
        const res = await fetch('/api/flashcards/decks', {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            },
            credentials: 'include',
        })
        if (!res.ok) {
            throw new Error('Could not fetch decks');
        }
        return setDeckInfo(await res.json())

    }
    React.useEffect(() => {
        getDecks()
    }, []);

    console.log(deckInfo)
  return (
    <div className='flex flex-row flex-wrap gap-3'>
        {
            deckInfo.map((deck : Deck) => (
                <div key={deck.id} className='p-3 rounded-xl bg-[#121212] text-white flex flex-col items-center gap-2'>
                    <h1>{deck.name}</h1>
                    <Link href={`/dashboard/flashcards/${deck.id}`}>
                        <span>Open</span>
                    </Link>
                </div>
            ))
        }
    </div>
  )
}

export default Decks