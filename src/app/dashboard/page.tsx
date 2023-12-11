'use client'
import React from 'react'

const page = async () => {

    const test  = async () => {
        const res  = await fetch('/api/flashcards/decks', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })

        if (!res.ok) {
            throw new Error('Failed to fetch Data')
        }

        console.log(await res.json())
    }
    return (
        <div className='text-white'>
            <h3 className='font-bold text-4xl '>Welcome to the dashboard</h3>
        </div>
    );
}

export default page