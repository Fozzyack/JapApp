'use client'
import Image from 'next/image'
import React, { useRef } from 'react'

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
    }[],
    audio: {
        audio_header: string,
        audio_file: string
    }[],
    correct: boolean | undefined
}

const submitCard = async (card_id: number, correct: boolean | undefined) => {
    const res = await fetch('/api/flashcards/cardreview', {
        method: 'POST',
        body: JSON.stringify({
            card_id: card_id,
            incorrect: !correct
        })
    });
    if (!res.ok) {
        throw new Error('There was an Error submitting card')
    }
    else {
        console.log(await res.json())
    }
}


const Review = ({ cards }: { cards: cards[] }) => {

    const [cardAmount, setCardAmount] = React.useState(cards.length)
    const [showAnswer, setShowAnswer] = React.useState(false);
    const soundRef = useRef<HTMLAudioElement | null>(null);

    const playsound = (soundfile: string) => {
        const newSoundfile = `/flashcardassets/${cards[0].deckId}/${soundfile}`;
        soundRef.current = new Audio(newSoundfile);
        (soundRef.current as HTMLAudioElement | null)?.play();
    };

    
    const wrongCard = () => {
        const wrong_card = cards[0];
        const random_index = Math.floor(Math.random() * (cards.length))
        cards[0].correct = false
        cards.push(wrong_card);
        cards.shift();
        
        cards[cards.length - 1] = cards[random_index]
        cards[random_index] =  wrong_card
        console.log(random_index)

    }

    const showAnswerButton = () => {
        setShowAnswer(true);
    }

    const answer = (correct: boolean) => {
        if (correct) {
            submitCard(cards[0].id, cards[0].correct)
            cards.shift();
            setCardAmount(prev => prev - 1);
        } else {
            wrongCard()
        }

        console.log(cards)
        return setShowAnswer(false);
    }
    return (
        <div className='h-full'>
            {
                cardAmount > 0 ?
                    <div className='h-full'>
                        {
                            showAnswer ?

                                <div className='p-10 rounded-xl bg-[#242544] flex flex-col text-white items-center gap-3 absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
                                    {
                                        cards[0].text.map((text, index) => (
                                            <div className='flex flex-row gap-3' key={index}>
                                                <h3 className='underline'>{text.text_header}</h3>
                                                <p>{text.content}</p>
                                            </div>
                                        ))
                                    }
                                    { cards[0].image_file ? <Image className='rounded-xl' src={`/flashcardassets/${cards[0].deckId}/${cards[0].image_file}`} alt={`${cards[0].image_header}`} width={300} height={300} /> : null}
                                    
                                    {
                                        cards[0].audio.map((audio, index) => (
                                            <div className='flex flex-row gap-3' key={index}>
                                                <button className='bg-blue-600 px-3 py-1 rounded-xl' onClick={() => { playsound(audio.audio_file) }}>{audio.audio_header}</button>
                                            </div>
                                        ))
                                    }
                                    <div className='flex flex-row  gap-3 mt-4'>
                                        <button onClick={() => { answer(true) }} className='bg-green-600 px-3 py-2 rounded-xl'>Correct</button>
                                        <button onClick={() => { answer(false) }} className='bg-red-600 px-3 py-2 rounded-xl'>Incorrect</button>
                                    </div>
                                </div>
                                :
                                <div className='p-10 rounded-xl bg-[#242544] flex flex-col text-white items-center gap-3 absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
                                    <h1 className='font-bold text-xl underline'>Question</h1>
                                    <p className='text-lg'>{cards[0].question}</p>
                                    <button onClick={() => { showAnswerButton() }} className='bg-blue-600 rounded px-3 py-2'>Show Answer</button>
                                </div>
                        }
                    </div>
                    :
                    <div className='h-full'>
                        <div className='flex flex-col text-center text-white absolute top-[50%] left-[50%] transform translate-x-[-50%]'>
                            <h1 className='font-bold text-3xl'>Congradulations</h1>
                            <p className='text-base'>You have completed this revision session</p>
                        </div>
                    </div>


            }

        </div>


    )
}

export default Review