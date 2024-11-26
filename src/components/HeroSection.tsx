import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBed,
    faCalendarDays,
    faPerson
} from "@fortawesome/free-solid-svg-icons";
import { Button } from './ui/button';

function HeroSection() {
    return (
        <div className='bg-blue-900 relative'>
            <div className='flex justify-center items-center'>
                <div className='flex flex-col w-full max-w-screen-lg justify-center py-28 text-white'>
                    <h1 className='font-bold text-5xl'>Find your next stay</h1>
                    <h4 className='text-2xl'>Search deals on hotels, homes, and much more...</h4>
                </div>
            </div>
            {/* Header Search */}
            <div className='h-[56px] flex justify-center'>
                <div className="headerSearch flex items-center w-full max-w-screen-lg justify-around bg-white border-4 border-yellow-500 py-3 px-0 gap-2 rounded absolute bottom-[-28px]">
                    <div className="headerSearchItem flex items-center gap-[10px]">
                        <FontAwesomeIcon icon={faBed} className='headerIcon text-slate-300 h-5' />
                        <input
                            type='text'
                            placeholder='Where are you going?'
                            className='headerSearchInput border-none outline-none'
                        />
                    </div>
                    <div className="headerSearchItem flex items-center gap-[10px]">
                        <FontAwesomeIcon icon={faCalendarDays} className='headerIcon text-slate-300 h-5' />
                        <span className='headerSearchText text-slate-300 cursor-pointer'>date to date</span>
                    </div>
                    <div className="headerSearchItem flex items-center gap-[10px]">
                        <FontAwesomeIcon icon={faPerson} className='headerIcon text-slate-300 h-5' />
                        <span className='headerSearchText text-slate-300 cursor-pointer'>2 adults 2 childern 2 rooms</span>
                    </div>
                    <div className="headerSearchItem flex items-center gap-[10px]">
                        <Button>Search</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection