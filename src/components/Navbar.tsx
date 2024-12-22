import React from 'react'
import { Button } from './ui/button'
import { poppins } from '@/app/ui/fonts'
import Link from 'next/link'

function Navbar() {
    return (
        <div className='flex h-14 bg-blue-900 justify-center navbar'>
            <div className='flex w-full max-w-screen-lg justify-between text-white items-center navcontainer'>
                <span
                    className={`${poppins.className} antialiased font-extrabold  text-3xl text-white p-2`}>
                    <Link href={"/"}>TravelNest</Link>
                </span>
                <div className='flex gap-5 navItems'>
                    <Button className="text-blue-900" variant={"outline"}>Register</Button>
                    <Button className="text-blue-900" variant={"outline"}>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar