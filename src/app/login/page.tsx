
import React from 'react'
import LargeMenu from './LargeMenu'
import MobileMenu from './MobileMenu'
import loginbackground from './assets/Login-Bg.png'

export const metadata = {
  title: 'Login'
};

const page = () => {
  return (
    <main className='h-screen w-full md:bg-slate-800 justify-center flex items-center bg-cover bg-center px-8 md:px-0' style={{backgroundImage: `url(${loginbackground.src})`}}>
      <LargeMenu />
      <MobileMenu />
    </main>
  )
}

export default page