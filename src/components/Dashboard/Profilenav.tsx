import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import Logout from './Logout'

const Profilenav = async () => {
    const session = await getServerSession(options)
    if (!session) {
        redirect('/api/auth/signIn?callback=/dashboard')
    }
    return (
        <div className='bg-white rounded-xl p-3 flex flex-col justify-center items-center gap-2'>
            <h1>{session.user?.name}</h1>

            <img src={session.user?.image  as string} alt='profile' className='rounded-full w-[50px] h-[50px]' />
            <div className='flex flex-row gap-2'>
                <button >
                    Settings
                </button>
                <Logout />
            </div>

        </div>
    )
}

export default Profilenav