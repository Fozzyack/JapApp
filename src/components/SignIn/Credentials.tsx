import { signIn } from 'next-auth/react'
import React from 'react'

const Credentials = () => {

    const submitCredentials = async (formData: FormData) => {
        'use server'
        
        signIn('credentials', {
            username: formData.get('username'), 
            password: formData.get('password'),
            callbackUrl:  '/dashboard'
        });
    }
    return (
        <div className='text-white'>
            <form id='loginform' className='flex flex-col gap-4' method='post' action={submitCredentials}>
                <label className='flex flex-col  gap-1'>
                    Username:
                    <input className='py-1 rounded-xl text-black px-1' name='username' type="text" />
                </label>
                <label className='flex flex-col gap-1'>
                    Password:
                    <input className='py-1 rounded-xl text-black px-1' name='password' type="password" />
                </label>
                <button type='submit'>
                    <div  className='bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-full'>
                        Sign in
                    </div>
                </button>
            </form>
        </div>
    )
}

export default Credentials