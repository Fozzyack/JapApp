import React from 'react'
import Profilenav from './Profilenav'
import NavSection from './NavSection'
const Navbar = () => {

    return (
        <div id='navbar' className='h-full fixed flex flex-col gap-5'>
            <NavSection />
            <Profilenav />
        </div>

    )
}

export default Navbar