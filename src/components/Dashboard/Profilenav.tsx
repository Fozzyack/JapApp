
import React from 'react'
import Logout from './Logout'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const Profilenav = () => {
    const { data: session } = useSession()
    return (
        <div className='bg-[#242544] rounded-xl p-3 flex flex-col justify-center items-center gap-2 text-white shadow-xl'>
            <h1>{session?.user?.name}</h1>

            {
                session?.user?.image ? <Image src={session?.user?.image as string} alt='profile' width={80} height={80} className='rounded-full' /> : null
                
            }

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