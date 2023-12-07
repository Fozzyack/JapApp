import React, { cache } from 'react'
import registerbg from './assets/Register-bg.png'

const signInUser = async (formData: FormData) => {
    'use server'
    try {
        const res = await fetch('http://localhost:3000/api/signin', {
            cache: 'no-cache',
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: formData.get('email'),
                name: formData.get('name'),
                password: formData.get('password')
            }),
        });
        if (res.ok) {
            console.log(await res.json())
        } else {
            const data = await res.json()
            console.log(data.msg);
        }
    } catch (error) {
        console.log('error', error);
    }
}

const LargeMenu = () => {
    return (
        <div className='hidden md:grid md:grid-cols-12 rounded-xl shadow-xl bg-[#121212] w-full h-full overflow-y-auto'>
            <div className=' md:col-span-6 justify-center lg:justify-start lg:col-span-4 rounded-l-xl text-white p-16 flex flex-col gap-4'>
                <h1 className='text-start font-bold text-4xl'>
                    Register
                </h1>
                <p>
                    Fill out the form to register your account.
                </p>
                <form className='flex flex-col gap-2 max-w-[380px]' action={signInUser}>
                    <div className='flex  flex-col gap-1'>
                        <label>Email:</label>
                        <input name='email' type="email" className='text-black text-sm p-2 rounded-lg' />
                    </div>
                    
                    <div className='flex  flex-col gap-1'>
                        <label > Name:</label>
                        <input name='name' type="text" className='text-black text-sm p-2 rounded-lg' />
                    </div>
                    <div className='flex  flex-col gap-1'>
                        <label > Password:</label>
                        <input name='password' type="password" className='text-black text-sm p-2 rounded-lg' />
                    </div>
                    <div className='flex  flex-col gap-1'>
                        <label > Confirm Password:</label>
                        <input type="password" className='text-black text-sm p-2 rounded-lg' />
                    </div>
                    <div className='flex justify-center w-full'>
                        <button className='py-2 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full mt-3 w-full'>
                            Reigster
                        </button>
                    </div>
                </form>
                <button>
                    <div className='w-full bg-white rounded-xl text-black text-center max-w-[380px] flex flex-row  gap-3 justify-center items-center hover:bg-slate-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
                        <p>Sign in with Google</p>
                    </div>
                </button>
            </div>
            <div className='md:col-span-6 lg:col-span-8 rounded-l-xl p-2 -ml-1 bg-center lg:bg-top md:bg-cover' style={{ backgroundImage: `url(${registerbg.src})` }}>

            </div>

        </div >
    )
}

export default LargeMenu