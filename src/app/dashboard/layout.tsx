

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
        <section className='bg-[#191a2f] min-h-screen max-h-full shadow px-4 md:p-16 '>
            <div className='flex flex-col md:flex-row gap-3'>
                <div className='md:w-[300px]'>
                    <NavBar />
                </div>
                <div className='w-full'>
                    {children}
                </div>

            </div>

        </section>
    )
}

export default DashboardLayout