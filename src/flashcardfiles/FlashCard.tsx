'use client'
import Image from 'next/image'
import React, { useRef } from 'react'
import useSound from 'use-sound'
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

interface PlaySoundFunction {
    (soundfile: string): void;
}

const FlashCard = ({ card }: { card: cards }) => {
    const [showAnswer, setShowAnswer] = React.useState(false)
    const [soundfile, setSoundfile] = React.useState(`/flashcardassets/${card.deckId}/${card.audio[0].audio_file}`)
    console.log(card.deckId)
    const [play] = useSound(soundfile)
    const soundRef = useRef<HTMLAudioElement | null>(null);

    const playsound = (soundfile: string) => {
        const newSoundfile = `/flashcardassets/${card.deckId}/${soundfile}`;
        soundRef.current = new Audio(newSoundfile);
        (soundRef.current as HTMLAudioElement | null)?.play(); // Use optional chaining here
    };
    return (
        <div className='bg-[#242544] p-5'>
            {
                showAnswer ? null :
                    <div className='text-center text-white  flex flex-col items-center'>
                        <p>{card.id}</p>
                        <p>{card.question}</p>
                        <Image src={`/flashcardassets/${card.deckId}/${card.image_file}`} alt='image' width={200} height={200} />
                        <div>
                            {
                                card.text.map((text, index) => (
                                    <div className='flex flex-row gap-2 justify-center'>
                                        <span>{text.text_header}</span>
                                        <span>{text.content}</span>
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            {
                                card.audio.map((audio, index) => (
                                    <div>
                                        <button onClick={() => { playsound(audio.audio_file) }}>{audio.audio_header}</button>
                                        <p>{audio.audio_file}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }
        </div>
    )
}


export default FlashCard