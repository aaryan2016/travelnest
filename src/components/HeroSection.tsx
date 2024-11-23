import React from 'react'
import { Input } from './ui/input'
import { Form } from './ui/form'

function HeroSection() {
    return (
        <div className='flex bg-blue-900 justify-center items-center'>
            <div className='flex flex-col w-full max-w-screen-lg justify-center py-28 text-white'>
                <h1 className='font-bold text-5xl'>Find your next stay</h1>
                <h4 className='text-2xl'>Search deals on hotels, homes, and much more...</h4>
            </div>
        </div>
    )
}

export default HeroSection