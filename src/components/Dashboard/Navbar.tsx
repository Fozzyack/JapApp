import Image from 'next/image'
import React from 'react'
import Logo from '@/assets/HeroImage.png'
import Profilenav from './Profilenav'
const Navbar = () => {
    return (
        <div id='navbar' className='h-full fixed flex flex-col gap-5'>
            <div className='border flex flex-col divide-y divide-gray-400 bg-white font-bold p-5 rounded-full gap-10 justify-around items-middle'>
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
            <Profilenav />
        </div>

    )
}

export default Navbar