import React from 'react'
import HeaderSearch from './HeaderSearch'

function HeroSection() {
    return (
        <div className='bg-blue-900 relative'>
            <div className='flex justify-center items-center'>
                <div className='flex flex-col w-full max-w-screen-lg justify-center py-28 text-white px-4 sm:px-8 lg:px-16'>
                    <h1 className='font-bold text-4xl sm:text-5xl lg:text-6xl'>Find your next stay</h1>
                    <h4 className='text-xl sm:text-2xl lg:text-3xl mt-4'>Search deals on hotels, homes, and much more...</h4>
                </div>
            </div>

            <div className='h-14 flex justify-center items-center absolute bottom-[-28px] w-full max-w-screen mx-1'>
                <HeaderSearch />
            </div>
        </div>
    )
}

export default HeroSection