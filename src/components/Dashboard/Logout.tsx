'use client'

import Link from 'next/link'
import React from 'react'

const Logout = () => {

    return (
        <Link href={'/api/auth/signout'}>
            <div className='bg-gradient-to-br from-purple-600 to-blue-600 text-white px-3 py-2 rounded-xl'>
                <span>Logout</span>
            </div>
        </Link>
    )
}

export default Logout