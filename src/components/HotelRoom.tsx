"use client"

import type { propertyRooms } from '@/app/(main)/hotels/[hotelId]/page'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button } from './ui/button'

const capacityIcon = "https://cdn-icons-png.flaticon.com/512/456/456212.png"

function HotelRoom({ props }: { props: propertyRooms | undefined }) {
    const capacityArray = Array(props?.capacity).fill(capacityIcon)

    const [selectedRooms, setSelectedRooms] = useState(1)
    return (
        <div className='hotelRoomItem border-[1px] border-solid border-gray-300 p-3 rounded flex gap-3 mb-5 justify-between'>
            <div className="flex flex-1 flex-col m-2">
                <h1 className="hrTitle text-lg font-extrabold text-blue-800">{props?.title}</h1>
                <div className='hrDesc text-sm mt-3'>
                    {props?.description}
                </div>
                <div className="text-base font-medium mt-6">
                    Number of Guests
                </div>
                <div className='flex gap-3 my-3'>
                    {capacityArray.map((icon, i) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        <img key={i} className="w-5" src={capacityIcon} alt="" />))}
                </div>
                <div className='mt-4'>
                    Select Rooms
                </div>
                <input
                    className='w-20 border-solid border-slate-300 border text-center justify-center'
                    type="number"
                    placeholder={selectedRooms.toString()}
                    min={1}
                    max={props?.quantity}
                    onChange={(e) => setSelectedRooms(Number(e.target.value))} />
            </div>
            <div className='p-1 m-2'>
                <ul className='flex flex-col justify-center'>
                    {props?.amenities.map(amenity => (
                        <div key={amenity.id} className='mb-1 flex gap-3 items-center'>
                            <FontAwesomeIcon className='h-3' icon={faCheck} />
                            <li className='text-sm mb-3 pt-2'>
                                {amenity.name}
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
            <div className='price w-72 flex-1 flex justify-center'>
                <div className='flex flex-col items-center my-3'>
                    <div className='flex'>
                        <div className='font-semibold text-lg'>Price for 9 Nights: $ </div>
                        <div className='flex text-xl font-bold'>{Number(props?.price.toFixed(0)) * selectedRooms}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 text-green-600 text-sm mt-8 ml-3">
                        <li><b>Free cancellation</b> anytime</li>
                        <li><b>No prepayment needed</b> - pay at the property</li>
                        <li><b>No credit card needed</b></li>
                    </div>
                    <div className='mt-2 w-full h-full flex flex-col-reverse p-2'>
                        <Button>I'll Reserve This only</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HotelRoom