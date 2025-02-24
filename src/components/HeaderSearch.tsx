"use client"

import React, { useState, Suspense } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBed,
    faPerson
} from "@fortawesome/free-solid-svg-icons";
import { Button } from './ui/button';
import { DatePickerWithRange } from './ui/DatePickerWithRange';
import { PersonDropdownMenu } from './ui/PersonDropdownMenu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { DateRange } from "react-day-picker"
import { addDays } from "date-fns"

export type options = {
    adult: number;
    kids: number;
    rooms: number;
}

function HeaderSearchContent() {
    const [options, setOptions] = useState<options>({
        adult: 2,
        kids: 0,
        rooms: 1
    })

    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 5),
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
    const router = useRouter()
    const replace = (url: string) => router.replace(url)

    const handleSearch = () => {
        // Prepare query parameters
        const query: Record<string, string | undefined> = {
            destination,
            from: date?.from?.toISOString().slice(0, 10), // Convert date to string
            to: date?.to?.toISOString().slice(0, 10),     // Convert date to string
            adult: options.adult.toString(),
            kids: options.kids.toString(),
            rooms: options.rooms.toString(),
        };

        const params = new URLSearchParams(searchParams);
        void ((query.destination) ? params.set("destination", query.destination) : params.delete("destination"));
        void ((query.from) ? params.set("from", query.from) : params.delete("from"));
        void ((query.to) ? params.set("to", query.to) : params.delete("to"));
        void ((query.adult) ? params.set("adult", query.adult) : params.delete("adult"));
        void ((query.kids) ? params.set("kids", query.kids) : params.delete("kids"));
        void ((query.rooms) ? params.set("rooms", query.rooms) : params.delete("rooms"));

        replace(`${pathname}hotels?${params}`)
    }

    return (
        <div className="headerSearch flex items-center justify-around max-w-screen-lg bg-white border-4 border-yellow-500 py-3 px-3 gap-3 rounded">
            <div className="headerSearchItem flex items-center gap-[10px]">
                <FontAwesomeIcon icon={faBed} className='headerIcon text-slate-300 h-5' />
                <input
                    type='text'
                    placeholder='Where are you going?'
                    className='headerSearchInput border-none outline-none '
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
                        <span className='headerSearchText text-slate-300 cursor-pointer'>{`${options.adult} adults ${options.kids} childern ${options.rooms} rooms`}</span>
                        <DropdownMenuContent className="w-56">
                            <PersonDropdownMenu options={options} handleOptions={handleOptions} />
                        </DropdownMenuContent>
                    </div>
                </DropdownMenuTrigger>
            </DropdownMenu>
            {/* <div className="headerSearchItem flex items-center gap-[10px]">
                <FontAwesomeIcon icon={faPerson} className='headerIcon text-slate-300 h-5' />
                <span className='headerSearchText text-slate-300 cursor-pointer'>{`${options.adult} adults ${options.kids} childern ${options.rooms} rooms`}</span>
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

export default function HeaderSearch() {
    return (
        <Suspense fallback={<div>Loading search parameters...</div>}>
            <HeaderSearchContent />
        </Suspense>
    );
}