'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Core23kImage from '@/assets/Core23k.jpg'
import deckImage2 from '@/assets/DeckImage2.jpg'
import deckImage3 from '@/assets/deckImage3.jpg'
import deckImage4 from '@/assets/deckImage4.jpg'

interface Deck {
    id: number;
    name: string;
    next_review: string;
}

const images = [deckImage4, deckImage3, deckImage2]
const Decks = () => {

    const [deckInfo, setDeckInfo] = React.useState([])
    const getDecks = async () => {
        const res = await fetch('/api/flashcards/decks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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

    const coreImages = (deckId: number) => {
        if(deckId === 1) {
            return(
                <Image src={Core23kImage} alt='JapImage' height={400} className='rounded-xl'/>
            )
        } else {
            return <Image src={images[deckId % 3 - 1]} alt='JapImage' height={400} className='rounded-xl'/>
        }
    }

    console.log(deckInfo)
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
            {
                deckInfo.map((deck: Deck) => (
                    <div key={deck.id} className='p-3 rounded-xl bg-[#242544] text-white flex flex-col items-center gap-2'>
                        <div>
                            {coreImages(deck.id)}
                        </div>
                        <div className='flex flex-col gap-3 text-center'>
                            <h1>{deck.name}</h1>
                            <Link href={`/dashboard/flashcards/${deck.id}`}>
                                <div className='px-5 py-1 bg-purple-600 rounded-full hover:bg-purple-800'>
                                    <span className='font-bold'>Open</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Decks