'use client'
import AboutUs from './components/AboutUs'
import Hero from './components/Hero'
import MeetYourTeam from './components/MeetYourTeam'
import NavBar from './components/NavBar'
import Pricing from './components/Pricing'
import { motion } from 'framer-motion';
export default function Home() {
  return (
    <main className='bg-[#121212] flex flex-col'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, duration: 1 }}
      >
        <NavBar />
      </motion.div>
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, duration: 3, delay: 1 }} className=' p-9 pt-32 md:p-16 md:pt-32'>
        <Hero />
      </motion.div>
      <motion.div
      initial={{ y: -200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{once: true}}
      transition={{type: 'spring', stiffness: 200, damping: 20, delay: 0.4}}
      className='p-9 md:p-16 bg-slate-900'>
        <AboutUs />
      </motion.div>
      <motion.div
      initial={{ y: -200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{once: true}}
      transition={{type: 'spring', stiffness: 200, damping: 20, delay: 0.4}}
       className='p-9 md:px-16'>
        <Pricing />
      </motion.div>
      <div className='p-9 md:px-16'>
        <MeetYourTeam />
      </div>
    </main>
  )
}
