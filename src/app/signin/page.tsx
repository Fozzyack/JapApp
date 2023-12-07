'use server'
import React from 'react'
import LargeMenu from './LargeMenu'
import MobileMenu from './MobileMenu'
import registerbg from './assets/Register-bg.png'



const page = () => {
  return (
    <main className='h-screen w-full md:bg-slate-800 justify-center flex items-center bg-cover bg-center px-8 md:px-0' style={{backgroundImage: `url(${registerbg.src})`}}>
      <LargeMenu />
      <MobileMenu />
    </main>
  )
}

export default page