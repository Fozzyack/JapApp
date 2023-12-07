"use  client";
import React from 'react'
import NavLinks from './NavLinks';

const NAV_LINKS = [
    {
        name: 'About',
        href: '#about'
    },
    {
        name: 'Pricing',
        href: '#pricing'
    },
    {
        name: 'Team',
        href: '#team'
    },
]
const NavBar = () => {

    const [menuIsOpen, setMenuIsOpen] = React.useState(false);

    const menuHandler = () => {
        return setMenuIsOpen(state => { return !state })
    }

    const logobutton = () => {
        const element = document.createElement('a');
        element.href = '#hero'
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    return (
        <div className='w-full fixed shadow-xl rounded-b-xl bg-slate-900 flex flex-col items-center'>
            <div className=' flex flex-row w-full justify-between items-center p-5'>
                <div className=''>
                    <button onClick={() => logobutton()}>
                        <h1 className='text-white font-bold text-3xl md:text-5xl px-10'>Logo</h1>
                    </button>

                </div>
                <div className='text-white hidden md:block'>
                    <NavLinks links={NAV_LINKS} device='desktop' gap={10} />
                </div>
                <div className='text-white block md:hidden  border rounded-xl'>

                    <button className='flex items-center justify-center w-full p-3' onClick={() => menuHandler()}>
                        <div>
                            {
                                menuIsOpen ?
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    : <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                                    </svg>
                            }
                        </div>


                    </button>
                </div>
            </div>
            {
                menuIsOpen ?
                    <div className='flex md:hidden text-white font-bold text-center pb-8'>
                        <NavLinks links={NAV_LINKS} device='mobile' gap={2} />
                    </div>
                    : null
            }
        </div>

    )
}

export default NavBar