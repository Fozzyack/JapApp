'use client'
import React from 'react'
import Profilenav from './Profilenav'
import NavSection from './NavSection'
import { SessionProvider } from 'next-auth/react'
import { motion } from 'framer-motion';
const Navbar = () => {
    const [showNav, setShowNav] = React.useState(false)
    return (
        <SessionProvider>
            <motion.div id='navbar' className='hidden md:flex h-full fixed flex-col gap-5 z-20'
                initial={{ opacity: 0, y: -200 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <NavSection />
                <Profilenav />
            </motion.div>
            <div className='block md:hidden'>
                {
                    showNav ?
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.4, ease: 'easeInOut'}}
                        >
                            <button className='mt-3 mb-2 rounded-xl p-3 bg-[#242544]' onClick={() => { setShowNav(prev => !prev) }}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                            <div className='flex md:hidden h-full fixed flex-col gap-2 overflow-auto'>
                                <NavSection />
                                <Profilenav />
                            </div>
                        </motion.div>

                        :
                        <button className='mt-3 rounded-xl p-3 bg-[#242544]' onClick={() => { setShowNav(prev => !prev) }}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                }
            </div>

        </SessionProvider>


    )
}

export default Navbar