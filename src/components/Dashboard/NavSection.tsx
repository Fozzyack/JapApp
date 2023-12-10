'use client'
import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/HeroImage.png'
const NavSection = () => {
    return (
        <div className='border flex flex-col divide-y divide-gray-400 bg-white font-bold p-5 rounded-xl gap-10 justify-around items-middle'>
            <div >
                <button className='flex flex-col items-center self-center'>
                    <Image src={Logo} alt='Logo' className='w-[50px] rounded-full  bg-purple-800' />
                    <h3>Midnight Mari</h3>
                </button>

            </div>
            <div>
                <button className='w-full h-full'>
                    <h4>FlashCards</h4>
                </button>
            </div>
            <div>
                <button className='w-full h-full'>
                    <h4>Readings</h4>
                </button>
            </div>
            <div>
                <button className='w-full h-full'>
                    <h4>Socials</h4>
                </button>
            </div>
            <div>
                <button className='w-full h-full'>
                    <h4>Resources</h4>
                </button>
            </div>

        </div>
    )
}

export default NavSection