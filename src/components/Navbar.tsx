'use client'
import React from 'react'
import { Button } from './ui/button'
import { poppins } from '@/app/ui/fonts'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
function Navbar() {
    const { data: session } = useSession()

    return (
        <div className='navbar flex h-14 bg-blue-900 justify-center'>
            <div className='navcontainer flex w-full max-w-screen-lg justify-between px-4 text-white items-center'>

                {/* logo */}
                <span
                    className={`${poppins.className} antialiased font-extrabold  text-3xl text-white p-2`}>
                    <Link href={"/"}>TravelNest</Link>
                </span>

                {/* Auth Buttons */}
                {(!session?.user) ? (
                    <div className='navItems flex gap-5'>
                        <Link href={"/sign-up"}>
                            <Button className="text-blue-900" variant={"outline"}>
                                Register
                            </Button>
                        </Link>
                        <Button className="text-blue-900" variant={"outline"} onClick={() => signIn()}>
                            Login
                        </Button>
                    </div>
                ) : (
                    <div className='navItems flex gap-5  items-center'>
                        <p>Signed in as {session?.user.username}</p>
                        <Button variant={"destructive"} onClick={() => signOut()}>Sign out</Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar