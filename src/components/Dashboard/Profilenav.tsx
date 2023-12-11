import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import Logout from './Logout'
import Image from 'next/image'

const Profilenav = async () => {
    const session = await getServerSession(options)
    if (!session) {
        redirect('/api/auth/signIn?callback=/dashboard')
    }
    return (
        <div className='bg-[#242544] rounded-xl p-3 flex flex-col justify-center items-center gap-2 text-white'>
            <h1>{session.user?.name}</h1>

            <Image src={session.user?.image  as string} alt='profile' width={80} height={80} className='rounded-full'/>
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