import React from 'react'

export const metadata = {
    title: 'Sign In'
}
const MobileMenu = () => {
    return (
        <div className=' flex flex-col md:hidden p-8 bg-[#121212] text-white  rounded-xl gap-7 overflow-y-auto'>
            <div>
                <h1 className=' font-bold text-3xl text-center'>Register</h1>
                <p className='p-3'>Fill out the form to register yoru account.</p>
            </div>

            <form className='flex flex-col gap-2 max-w-[380px]'>
                    <div className='flex  flex-col gap-1'>
                        <label>Email:</label>
                        <input type="email" className='text-black text-sm p-2 rounded-lg' />
                    </div>
                    <div className='flex  flex-col gap-1'>
                        <label > Password:</label>
                        <input type="password" className='text-black text-sm p-2 rounded-lg' />
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
                <div className='w-full bg-white rounded-xl text-black text-center max-w-[450px] flex flex-row  gap-3 justify-center items-center hover:bg-slate-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
                    <p>Sign in with Google</p>
                </div>
            </button>
        </div>
    )
}

export default MobileMenu