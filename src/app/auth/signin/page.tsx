import Credentials from '@/components/SignIn/Credentials'
import Providers from '@/components/SignIn/Providers'
import React from 'react'
const page = () => {
  return (
    <div className='bg-[#121212] flex h-screen w-full md:p-10'>
      <div className='flex  flex-col gap-5'>
        <h3  className='text-white text-5xl font-bold'>Login</h3>
        <p  className='text-white'>Please enter your credentials or login with a provider.</p>
        <Credentials />
        <Providers />
      </div>

    </div>
  )
}

export default page