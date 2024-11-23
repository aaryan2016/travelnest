import React from 'react'
import { Button } from './ui/button'
import { poppins } from '@/app/ui/fonts'

function Topbar() {
    return (
        <div className='flex justify-between p-4'>
            <div className={`${poppins.className} antialiased font-bold text-xl text-white`}>
                TravelNest
            </div>
            <div className="flex gap-3">
                <Button variant={"outline"}>Register</Button>
                <Button variant={"outline"}>Signin</Button>
            </div>
        </div>
    )
}

export default Topbar