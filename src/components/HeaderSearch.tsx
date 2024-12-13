"use client"

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBed,
    faCalendarDays,
    faPerson
} from "@fortawesome/free-solid-svg-icons";
import { Button } from './ui/button';
import { DatePickerWithRange } from './ui/DatePickerWithRange';
import { PersonDropdownMenu } from './ui/PersonDropdownMenu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useRouter } from 'next/navigation';

export type options = {
    adult: number;
    children: number;
    rooms: number;
}

function HeaderSearch() {
    const [options, setOptions] = useState<options>({
        adult: 2,
        children: 0,
        rooms: 1
    })

    const handleOptions = (name: keyof options, operation: "i" | "d") => {
        setOptions((prev) => {
            return {
                ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            }
        })
    }

    const router = useRouter()
    const handleSearch = () => {
        router.push('/search-results')
    };
    
    return (
        <div className="headerSearch flex items-center justify-around max-w-screen-lg bg-white border-4 border-yellow-500 py-3 px-3 gap-3 rounded">
            <div className="headerSearchItem flex items-center gap-[10px]">
                <FontAwesomeIcon icon={faBed} className='headerIcon text-slate-300 h-5' />
                <input
                    type='text'
                    placeholder='Where are you going?'
                    className='headerSearchInput border-none outline-none text-slate-300'
                />
            </div>
            {/* <div className="headerSearchItem flex items-center gap-[10px]">
                        <FontAwesomeIcon icon={faCalendarDays} className='headerIcon text-slate-300 h-5' />
                        <span className='headerSearchText text-slate-300 cursor-pointer'>date to date</span>
                    </div> */}
            <DatePickerWithRange className='text-slate-300' />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='flex items-center gap-[10px] border-none outline-none'>
                        <FontAwesomeIcon icon={faPerson} className='headerIcon text-slate-300 h-5' />
                        <span className='headerSearchText text-slate-300 cursor-pointer'>{`${options.adult} adults ${options.children} childern ${options.rooms} rooms`}</span>
                        <DropdownMenuContent className="w-56">
                            <PersonDropdownMenu options={options} handleOptions={handleOptions} />
                        </DropdownMenuContent>
                    </div>
                </DropdownMenuTrigger>
            </DropdownMenu>
            {/* <div className="headerSearchItem flex items-center gap-[10px]">
                <FontAwesomeIcon icon={faPerson} className='headerIcon text-slate-300 h-5' />
                <span className='headerSearchText text-slate-300 cursor-pointer'>{`${options.adult} adults ${options.children} childern ${options.rooms} rooms`}</span>
                <PersonDropdownMenu options={options} />
            </div> */}
            <div className="headerSearchItem flex items-center gap-3">
                <Button onClick={handleSearch}>Search</Button>
            </div>
        </div>
    )
}

export default HeaderSearch