
import EmailSignIn from '@/components/SignIn/EmailSignIn'
import Providers from '@/components/SignIn/Providers'
import React from 'react'
import BackgroundImage from '@/assets/Login-Bg.png'
const page = () => {
  return (
    <div className='bg-[#121212] flex h-screen w-full md:grid md:grid-cols-2'>
      <div className='hidden md:flex md:p-16 lg:p-32'>
        <div className='flex flex-col gap-5 '>
          <h3 className='text-white text-5xl font-bold'>Sign In</h3>
          <p className='text-white'>Please enter your email or login with a provider.</p>
          <EmailSignIn />
          <Providers />
        </div>
      </div>
      <div className='w-full flex  justify-center items-center' style={{ backgroundImage: `url(${BackgroundImage.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='bg-[#121212] md:hidden rounded-xl p-5 text-center flex flex-col gap-4'>
          <h3 className='text-white text-5xl font-bold'>Sign In</h3>
          <p className='text-white'>Please enter your email or login with a provider.</p>
          <EmailSignIn />
          <Providers />
        </div>
      </div>

    </div>
  )
}

export default page