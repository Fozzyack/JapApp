

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
    const navbar_width = 200
    const widths = {
        width: `max-w-[${navbar_width}px]`,
        width_c: `ml-[${navbar_width}px]`
    }
    const session = await getServerSession(options)

    if(!session) {
        redirect('/api/auth/signin?callbackUrl=/dashboard')
    }

    return (
        <section className='bg-[#121212] h-screen p-5 md:p-16 shadow'>
            <div className='flex flex-row'>
                <div className=''>
                    <NavBar />
                </div>
                <div className='md:ml-[200px] w-full border'>
                    {children}
                </div>

            </div>

        </section>
    )
}

export default DashboardLayout