'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const page = () => {

    return (
        <div className='bg-[#191a2f] h-screen flex flex-col items-center justify-center'>
            <div className='bg-[#242544] p-4 rounded-xl text-white flex flex-col items-center gap-4 '>
                <h1 className='text-4xl'>Sign Out</h1>
                <p>Are you sure you want to sign out?</p>
                <div className='flex flex-row gap-4 items-center'>
                    <button className='px-3 py-2 bg-red-600 rounded' onClick={() => {
                        signOut({callbackUrl: '/'})
                    }}>Sign Out</button>
                    <Link href={'/dashboard'} className='px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded'>Go Back</Link>
                </div>

            </div>
        </div>
    )
}

export default page