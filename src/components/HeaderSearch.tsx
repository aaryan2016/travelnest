import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBed,
    faCalendarDays,
    faPerson
} from "@fortawesome/free-solid-svg-icons";
import { Button } from './ui/button';
import { DatePickerWithRange } from './ui/DatePickerWithRange';
import { PersonDropdownMenu } from './ui/PersonDropdownMenu';

function HeaderSearch() {
    return (
        <div className="headerSearch flex items-center justify-around max-w-screen-lg bg-white border-4 border-yellow-500 py-3 px-3 gap-2 rounded">
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
            <div className="headerSearchItem flex items-center gap-[10px]">
                <FontAwesomeIcon icon={faPerson} className='headerIcon text-slate-300 h-5' />
                <span className='headerSearchText text-slate-300 cursor-pointer'>2 adults 2 childern 2 rooms</span>
                <PersonDropdownMenu />
            </div>
            <div className="headerSearchItem flex items-center gap-[10px]">
                <Button>Search</Button>
            </div>
        </div>
    )
}

export default HeaderSearch