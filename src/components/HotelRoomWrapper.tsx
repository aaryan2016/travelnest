// components/HotelRoomWrapper.tsx (Client Component)

"use client"

import React, { useState } from 'react'
import HotelRoom from './HotelRoom'
import type { propertyData, propertyRooms } from '@/app/(main)/hotels/[hotelId]/page' // Adjust import path if necessary
import { Button } from './ui/button'

export default function HotelRoomWrapper({ propertyRooms, from, to }: {
    propertyRooms: propertyRooms[] | undefined,
    from: string,
    to: string
}) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const [selectedRoomsData, setSelectedRoomsData] = useState<any[]>([]) // Holds all selected rooms and their details

    console.log("selectedRoomsData", selectedRoomsData)

    const numberOfNights = (new Date(to).getTime() - new Date(from).getTime()) / (1000 * 3600 * 24) // Calculate number of nights

    const totalPrice = selectedRoomsData.reduce((total, room) => total + room.price, 0)

    return (
        <div className="hotelRoomWrapper flex flex-col gap-5">
            {propertyRooms?.map((room: propertyRooms) => (
                <HotelRoom
                    key={room.id}
                    props={room}
                    numberOfNights={numberOfNights}
                    selectedRoomsData={selectedRoomsData}
                    setSelectedRoomsData={setSelectedRoomsData} // Pass the state setter down
                />
            ))}
            {/* Total price for all selected rooms */}
            <div className='flex items-center justify-between'>
                <div className='flex'>
                    <div className='font-semibold text-lg'>Price for {numberOfNights} Nights: $ </div>
                    <div className='flex text-xl font-bold'>{totalPrice}</div>
                </div>
                <div className='mx-10'>
                    <Button>Proceed for Payment</Button>
                </div>
            </div>
        </div>
    )
}
