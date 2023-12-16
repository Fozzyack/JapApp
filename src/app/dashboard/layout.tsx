

import React from 'react'
import NavBar from '@/components/Dashboard/Navbar'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { options } from '../api/auth/[...nextauth]/options'

const DashboardLayout = async({
    children,
}: {
    children: React.ReactNode
}) => {
    const session = await getServerSession(options)

    if(!session) {
        redirect('/api/auth/signin?callbackUrl=/dashboard')
    }

    return (
        <section className='bg-[#191a2f] shadow px-4 md:p-16 flex flex-col md:flex-row gap-3 min-h-screen max-h-full'>
                <div className='md:w-[300px] relative z-20 '>
                    <NavBar />
                </div>
                <div className='w-full'>
                    {children}
                </div>

        </section>
    )
}

export default DashboardLayout