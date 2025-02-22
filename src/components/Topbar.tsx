import React from 'react'
import { Button } from './ui/button'
import { poppins } from '@/app/ui/fonts'
import Link from 'next/link'
function Topbar() {
    return (
        <div className='flex justify-between p-4'>
            <div className={`${poppins.className} antialiased font-bold text-xl text-white`}>
                TravelNest
            </div>
            <div className="flex gap-3">
                <Link href={"/sign-up"}><Button variant={"outline"}>Register</Button></Link>
                <Link href={"/sign-in"}><Button variant={"outline"}>Signin</Button></Link>
            </div>
        </div>
    )
}

export default Topbar