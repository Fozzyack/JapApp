import React from 'react'
import { headers } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import Review from '@/components/Flashcards/Review';

async function getData(deckID: number) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/flashcards/getdeckcards/${deckID}`,
    {
      method: 'GET',
      headers: headers()
    })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
interface cards {
  id: number,
  deckId: number,
  question: string,
  card_order: number,
  flashcardId: number,
  image_file: string,
  image_header: string,
  text: {
    position: number,
    text_header: string,
    content: string
  }[]
  audio: {
    audio_header: string,
    audio_file: string
  }[]
}


function mergeArraysPreservingOrder(arr1: cards[], arr2: cards[]) {
  const mergedArray = [...arr1];

  for (const element of arr2) {
    const randomIndex = Math.floor(Math.random() * (mergedArray.length + 1));
    mergedArray.splice(randomIndex, 0, element);
  }

  return mergedArray;
}

const Page = async ({ params }: { params: { deck: number } }) => {
  const cards = await getData(params.deck)
  const flashcards = mergeArraysPreservingOrder(cards.new_cards, cards.revise_cards);

  return (
    <div className='h-full'>
      <Review cards={flashcards}/>
    </div>

  );
};

export default Page;