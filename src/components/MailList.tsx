import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

function MailList() {
    return (
        <div className='mail w-full mt-12 bg-blue-900 text-white flex flex-col items-center gap-5 p-12'>
            <h1 className='mailTitle text-2xl font-bold'>Save Time, Save Money!</h1>
            <span className='mailDesc'>Signup and we'll send the best deals to you</span>
            <div className="mailInputContainer flex justify-center h-9">
                <Input
                    type="text"
                    placeholder='Your Email'
                    className='w-80 h-full p-[10] bg-white mr-[10]'
                />
                <Button className='text-white h-full border-none'>Subscribe</Button>
            </div>
        </div>
    )
}

export default MailList