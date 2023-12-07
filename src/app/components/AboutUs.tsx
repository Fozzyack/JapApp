'use client';
import Image from 'next/image'
import React from 'react'
import AboutUsImage from '../../assets/AboutUs-resize.png'
const AboutUs = () => {
  return (
    <div id='about' className='flex flex-col items-center md:grid md:grid-cols-2 gap-8'>
        <div className='flex items-center justify-center'>
            <Image  src={AboutUsImage} alt='Black and Purple Cat' className='rounded-xl shadow-lg '/>
        </div>
        <div className='text-center md:text-left flex flex-col gap-5'>
            <h1 className='text-4xl font-bold text-white'> About Us</h1>
            <p className='text-base text-white'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam amet autem sapiente deserunt, delectus natus obcaecati libero dolores nobis architecto nam non reprehenderit fugiat numquam consequatur in praesentium reiciendis sint?
            </p>
        </div>
    </div>
  )
}

export default AboutUs