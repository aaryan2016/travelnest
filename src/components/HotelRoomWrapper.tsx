"use client"

import React, { useState } from 'react'
import HotelRoom from './HotelRoom'
import type { propertyRooms } from '@/app/(main)/hotels/[hotelId]/page'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export interface selectedRoomsData {
    id: string,
    title: string,
    description: string,
    quantity: number,
    unitPrice: number,
    totalPrice: number,
    roomType: string
}

export default function HotelRoomWrapper({ propertyName, propertyRooms, from, to }: {
    propertyName: string | undefined,
    propertyRooms: propertyRooms[] | undefined,
    from: string,
    to: string
}) {
    const [selectedRoomsData, setSelectedRoomsData] = useState<selectedRoomsData[]>([]) // Holds all selected rooms and their details

    console.log("selectedRoomsData: ", selectedRoomsData)

    const numberOfNights = Number((new Date(to).getTime() - new Date(from).getTime()) / (1000 * 3600 * 24)) // Calculate number of nights

    const totalPrice = selectedRoomsData.reduce((total, room) => total + room.totalPrice, 0)
    const totalRooms = selectedRoomsData.reduce((total, room) => total + room.quantity, 0)
    const filteredRooms = selectedRoomsData.filter(room => room.quantity > 0);

    const router = useRouter();

    const handleProceedToPayment = () => {
        // Convert selected rooms into a query string to pass to the checkout page
        const selectedRoomsQuery = JSON.stringify(filteredRooms);
        const fromQuery = encodeURIComponent(from);
        const toQuery = encodeURIComponent(to);
        const numberOfNightsQuery = numberOfNights;

        // Redirect to the checkout page
        router.push(`/checkout?selectedRooms=${selectedRoomsQuery}&from=${fromQuery}&to=${toQuery}&numberOfNights=${numberOfNightsQuery}&propertyName=${propertyName}`);
    };

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
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 p-4 border rounded-md bg-slate-50'>
                <div className='flex'>
                    <div className='font-semibold text-lg'>Price for {numberOfNights} Nights: $ </div>
                    <div className='flex text-xl font-bold'>{totalPrice}</div>
                </div>
                <div className='flex'>
                    <div className='font-semibold text-lg'>Total Rooms: </div>
                    <div className='flex text-xl font-bold'>{totalRooms}</div>
                </div>
                <div className='self-start sm:self-auto'>
                    <Button
                        onClick={handleProceedToPayment}
                        disabled={totalRooms <= 0}>Proceed for Payment</Button>
                </div>
            </div>
        </div>
    )
}
