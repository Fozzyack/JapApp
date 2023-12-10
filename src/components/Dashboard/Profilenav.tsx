import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const Profilenav = async () => {
    const session = await getServerSession(options)
    if (!session) {
        redirect('/api/auth/signIn?callback=/dashboard')
    }
    return (
        <div className='bg-white rounded-xl p-3 flex flex-col justify-center items-center gap-2'>
            <h1>{session.user?.name}</h1>
            <img src={session.user?.image} alt='profile' className='rounded-full' />
            <div className='flex flex-row gap-2'>
                <button >
                    Settings
                </button>
                <button className='bg-gradient-to-br from from-purple-600 to to-blue-600 rounded text-white px-2 py-1'>
                    Logout
                </button>
            </div>

        </div>
    )
}

export default Profilenav