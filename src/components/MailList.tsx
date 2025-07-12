import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

function MailList() {
    return (
        <div className='mail w-full mt-12 bg-blue-900 text-white flex flex-col items-center gap-5 p-12'>
            <h1 className='mailTitle text-2xl font-bold'>Save Time, Save Money!</h1>
            <span className='mailDesc'>Signup and we&apos;ll send the best deals to you</span>
            <div className="mailInputContainer flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-3 mt-6 w-full max-w-2xl">
                <Input
                    type="text"
                    placeholder='Your Email'
                    className='w-full sm:w-80 p-3 rounded-md bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600'
                />
                <Button className='w-full sm:w-auto text-white font-semibold py-3 px-6 rounded-md hover:bg-yellow-600 focus:outline-none'>Subscribe</Button>
            </div>
        </div>
    )
}

export default MailList