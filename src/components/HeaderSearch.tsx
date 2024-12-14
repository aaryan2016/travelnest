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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { DateRange } from "react-day-picker"
import { addDays } from "date-fns"
import { PathParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

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

    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 10),
    })

    const [destination, setDestination] = useState<string>("")
    // console.log("destination:", destination)
    // console.log("date:", date)
    // console.log("options:", options)

    const handleOptions = (name: keyof options, operation: "i" | "d") => {
        setOptions((prev) => {
            return {
                ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            }
        })
    }

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = () => {
        // Prepare query parameters
        const query: { [key: string]: string | undefined } = {
            destination,
            from: date?.from?.toISOString().slice(0, 10), // Convert date to string
            to: date?.to?.toISOString().slice(0, 10),     // Convert date to string
            adult: options.adult.toString(),
            children: options.children.toString(),
            rooms: options.rooms.toString(),
        };

        const params = new URLSearchParams(searchParams);
        (query.destination) ? params.set("destination", query.destination) : params.delete("destination");
        (query.from) ? params.set("from", query.from) : params.delete("from");
        (query.to) ? params.set("to", query.to) : params.delete("to");
        (query.adult) ? params.set("adult", query.adult) : params.delete("adult");
        (query.children) ? params.set("children", query.children) : params.delete("children");
        (query.rooms) ? params.set("rooms", query.rooms) : params.delete("rooms");

        replace(`${pathname}search-results?${params}`)
    }

    return (
        <div className="headerSearch flex items-center justify-around max-w-screen-lg bg-white border-4 border-yellow-500 py-3 px-3 gap-3 rounded">
            <div className="headerSearchItem flex items-center gap-[10px]">
                <FontAwesomeIcon icon={faBed} className='headerIcon text-slate-300 h-5' />
                <input
                    type='text'
                    placeholder='Where are you going?'
                    className='headerSearchInput border-none outline-none text-slate-300'
                    onChange={(e) => { setDestination(e.target.value) }}
                />
            </div>
            {/* <div className="headerSearchItem flex items-center gap-[10px]">
                    <FontAwesomeIcon icon={faCalendarDays} className='headerIcon text-slate-300 h-5' />
                    <span className='headerSearchText text-slate-300 cursor-pointer'>date to date</span>
                </div> */}
            <DatePickerWithRange date={date} setDate={setDate} className='text-slate-300' />

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
                <Button
                    onClick={handleSearch}
                    disabled={destination === ""}
                >Search</Button>
            </div>
        </div>
    )
}

export default HeaderSearch