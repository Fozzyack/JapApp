'use client'
import React, { useEffect, useState } from 'react'

const page = ({ params }: { params: { deck: number } }) => {

  const [deckInfo, setDeckInfo] = useState({
    name: '',
    description: '',
    author: '',
    premade: true,
    last_review: null,
    next_review: null

  });

  const getDeckInfo = async () => {
    const res = await fetch('/api/flashcards/getDeck', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deckId: params.deck
      }),
    });

    if (!res.ok) {
      throw new Error('Could not get Deck Info')
    }

    setDeckInfo(await res.json())
  }
  useEffect(() => {
    getDeckInfo();
  }, []);

  console.log(deckInfo)

  return (
    <div className='bg-[#242544] rounded-xl flex flex-col text-white p-4 justify-start items-center md:items-start gap-4 shadow'>
      <div>
        <h2 className='text-white text-5xl font-bold'>{deckInfo.name}</h2>
        <p>Author: {deckInfo.author}</p>
        <p>{deckInfo.description}</p>
      </div>
      <div className='flex flex-row gap-3'>
        <button className='bg-gradient-to-br px-3 py-2 rounded-xl from-purple-600 to-blue-600'>Start Reviewing</button>
        <button className='bg-gray-500 px-3 py-2 rounded-xl'>Settings</button>
        {
          deckInfo.premade ? null : <button className='bg-gray-500 px-3 py-2 rounded-xl'>Edit</button>
        }
      </div>

    </div>
  )
}

export default page