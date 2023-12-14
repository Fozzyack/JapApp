'use client'

import { signIn } from 'next-auth/react'
import React from 'react'

const EmailSignIn = () => {

  const [email, setEmail] = React.useState('')
  const [emailSent, setEmailSent] = React.useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const signinWithEmail = () => {
    signIn('email', { email: email, callbackUrl: '/dashboard' })
    setEmailSent(true);
  }

  return (
    <div>
      {
        emailSent ? 
        <div className='text-center bg-green-500 border border-green-700 text-white py-3 rounded-xl'>
          <p>Sending your Email</p>
          <p>It should be in your inbox soon</p>
        </div>
        
        : 
        
        <div className='text-white'>
          <form method="post" action='/api/auth/signin/email' className='flex flex-col'>
            <label className='flex flex-col gap-2 '>
              <span className='font-bold'>Email address</span>
              <input className='py-1 px-3 rounded-xl text-black' type="email" id='email' name='email' value={email} onChange={handleChange} />
            </label>
            <button type='submit' className='p-3 mt-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600' onClick={() => { signinWithEmail() }}>Sign in with Email</button>
          </form>
        </div>
      }
    </div>

  )
}

export default EmailSignIn