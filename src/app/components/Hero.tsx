"use client";
import HeroImage from '../../assets/HeroImage.png'
import Image from "next/image";
import { useRouter } from 'next/navigation'

const Hero = () => {

    const router = useRouter()
    const redirectButton = (href: string) => {
        router.push(href);
        
    }
    return (
        <div id='hero' className='flex flex-col lg:grid lg:grid-cols-2 text-white items-center align-middle bg-slate-900 rounded-xl shadow pt-6 md:pt-0'>
            <div className="flex  flex-col gap-2 text-center md:text-left md:p-32">
                <h3 className="text-2xl md:pb-2 md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to bg-blue-500 ">
                    Welcome To
                </h3>
                <h2 className="text-2xl md:text-7xl font-bold">Midnight Mari
                </h2>
                <div>
                    <p className="text-base px-3">
                    Dive into the captivating realm of Japanese language with MidnightMari, where every lesson becomes a starlight adventure on your path to fluency.
                    </p>
                </div>
                <div className='flex flex-col md:flex-row gap-3 justify-center md:justify-start py-5 px-5 md:px-0' >
                    <button className=' bg-gradient-to-br from-purple-600 to bg-blue-500 w-full rounded-full py-3 text-center' onClick={() => (redirectButton('/signin'))}>
                        Sign Up
                    </button>
                    <button className=' bg-gradient-to-br from-purple-600 to bg-blue-500 w-full rounded-full py-1' onClick={() => (redirectButton('/dashboard'))}>
                        <div className='rounded-full bg-[#121212] mx-1 py-2 text-center'>
                            <span className=' rounded-full font-bold '>
                                Login
                            </span>
                        </div>

                    </button>
                </div>
            </div>
            <div className='justify-self-end p-8 '>
                <Image src={HeroImage} alt='MokuMari' className='rounded-full bg-[#121212]  shadow-lg' />

            </div>
        </div>
    )
}

export default Hero