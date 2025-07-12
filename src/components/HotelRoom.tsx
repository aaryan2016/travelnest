// "use client"

// import type { propertyRooms } from '@/app/(main)/hotels/[hotelId]/page'
// import { faCheck } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import React, { useState } from 'react'
// import { Button } from './ui/button'

// const capacityIcon = "https://cdn-icons-png.flaticon.com/512/456/456212.png"

// function HotelRoom({ props }: { props: propertyRooms | undefined }) {
//     const capacityArray = Array(props?.capacity).fill(capacityIcon)

//     const [selectedRooms, setSelectedRooms] = useState(1)
//     return (
//         <div className='hotelRoomItem border-[1px] border-solid border-gray-300 p-3 rounded flex gap-3 mb-5 justify-between'>
//             <div className="flex flex-1 flex-col m-2">
//                 <h1 className="hrTitle text-lg font-extrabold text-blue-800">{props?.title}</h1>
//                 <div className='hrDesc text-sm mt-3'>
//                     {props?.description}
//                 </div>
//                 <div className="text-base font-medium mt-6">
//                     Number of Guests
//                 </div>
//                 <div className='flex gap-3 my-3'>
//                     {capacityArray.map((icon, i) => (
//                         // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
//                         <img key={i} className="w-5" src={capacityIcon} alt="" />))}
//                 </div>
//                 <div className='mt-4'>
//                     Select Rooms
//                 </div>
//                 <input
//                     className='w-20 border-solid border-slate-300 border text-center justify-center'
//                     type="number"
//                     placeholder={selectedRooms.toString()}
//                     min={1}
//                     max={props?.quantity}
//                     onChange={(e) => setSelectedRooms(Number(e.target.value))} />
//                 <div className='mt-2'>Available Rooms: {props?.quantity}</div>
//             </div>
//             <div className='p-1 m-2'>
//                 <ul className='flex flex-col justify-center'>
//                     {props?.amenities.map(amenity => (
//                         <div key={amenity.id} className='mb-1 flex gap-3 items-center'>
//                             <FontAwesomeIcon className='h-3' icon={faCheck} />
//                             <li className='text-sm mb-3 pt-2'>
//                                 {amenity.name}
//                             </li>
//                         </div>
//                     ))}
//                 </ul>
//             </div>
//             <div className='price w-72 flex-1 flex justify-center'>
//                 <div className='flex flex-col items-center my-3'>
//                     <div className='flex'>
//                         <div className='font-semibold text-lg'>Price for 9 Nights: $ </div>
//                         <div className='flex text-xl font-bold'>{Number(props?.price.toFixed(0)) * selectedRooms}
//                         </div>
//                     </div>
//                     <div className="flex flex-col gap-4 text-green-600 text-sm mt-8 ml-3">
//                         <li><b>Free cancellation</b> anytime</li>
//                         <li><b>No prepayment needed</b> - pay at the property</li>
//                         <li><b>No credit card needed</b></li>
//                     </div>
//                     <div className='mt-2 w-full h-full flex flex-col-reverse p-2'>
//                         <Button>I'll Reserve This only</Button>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default HotelRoom

//V2 - work fine!
// "use client"

// import type { propertyRooms } from '@/app/(main)/hotels/[hotelId]/page'
// import { faCheck } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import type React from 'react'
// import { useState } from 'react'
// import { Button } from './ui/button'

// const capacityIcon = "https://cdn-icons-png.flaticon.com/512/456/456212.png"

// function HotelRoom({ props, from, to, selectedRoomsData, setSelectedRoomsData }: { 
//     props: propertyRooms | undefined,
//     from: string,
//     to: string,
//     // biome-ignore lint/suspicious/noExplicitAny: <explanation>
//     selectedRoomsData: any[],
//     // biome-ignore lint/suspicious/noExplicitAny: <explanation>
//     setSelectedRoomsData: React.Dispatch<React.SetStateAction<any[]>>
// }) {
//     const capacityArray = Array(props?.capacity).fill(capacityIcon)

//     const [selectedRooms, setSelectedRooms] = useState(1)
//     const [showRoomControls, setShowRoomControls] = useState(false) // Track if we show increase/decrease buttons

//     const maxRooms = props?.quantity ?? 0 // Default to 0 if undefined

//     // Function to handle increasing the number of selected rooms
//     const handleIncrease = () => {
//         if (selectedRooms < maxRooms) {
//             setSelectedRooms((prev) => prev + 1)
//         }
//     }

//     // Function to handle decreasing the number of selected rooms
//     const handleDecrease = () => {
//         if (selectedRooms > 0) {
//             setSelectedRooms((prev) => prev - 1)
//         }
//     }

//     // Handle when "I'll Reserve This only" button is clicked
//     const handleReserveClick = () => {
//         setShowRoomControls(true)
//     }

//     // If selectedRooms is 0, revert to showing the "I'll Reserve This only" button
//     if (selectedRooms === 0 && showRoomControls) {
//         setShowRoomControls(false)
//     }

//     return (
//         <div className='hotelRoomItem border-[1px] border-solid border-gray-300 p-3 rounded flex gap-3 mb-5 justify-between'>
//             <div className="flex flex-1 flex-col m-2">
//                 <h1 className="hrTitle text-lg font-extrabold text-blue-800">{props?.title}</h1>
//                 <div className='hrDesc text-sm mt-3'>
//                     {props?.description}
//                 </div>
//                 <div className="text-base font-medium mt-6">
//                     Number of Guests
//                 </div>
//                 <div className='flex gap-3 my-3'>
//                     {capacityArray.map((icon, i) => (
//                         // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
//                         <img key={i} className="w-5" src={capacityIcon} alt="" />))}
//                 </div>
//                 <div className='mt-4'>
//                     {showRoomControls ? (
//                         <div className="flex gap-3 items-center">
//                             <Button onClick={handleDecrease} disabled={selectedRooms <= 0}>-</Button>
//                             <span>{selectedRooms}</span>
//                             <Button
//                                 onClick={handleIncrease}
//                                 disabled={selectedRooms >= maxRooms} // Disable "+" button if max reached
//                             >
//                                 +
//                             </Button>
//                         </div>
//                     ) : (
//                         <Button onClick={handleReserveClick}>I'll Reserve This only</Button>
//                     )}
//                 </div>
//                 {showRoomControls && (
//                     <div className='mt-2'>Available Rooms: {props?.quantity}</div>
//                 )}
//             </div>
//             <div className='p-1 m-2'>
//                 <ul className='flex flex-col justify-center'>
//                     {props?.amenities.map(amenity => (
//                         <div key={amenity.id} className='mb-1 flex gap-3 items-center'>
//                             <FontAwesomeIcon className='h-3' icon={faCheck} />
//                             <li className='text-sm mb-3 pt-2'>
//                                 {amenity.name}
//                             </li>
//                         </div>
//                     ))}
//                 </ul>
//             </div>
//             <div className='price w-72 flex-1 flex justify-center'>
//                 <div className='flex flex-col items-center my-3'>
//                     <div className='flex'>
//                         <div className='font-semibold text-lg'>Price for 9 Nights: $ </div>
//                         <div className='flex text-xl font-bold'>{Number(props?.price.toFixed(0)) * selectedRooms}
//                         </div>
//                     </div>
//                     <div className="flex flex-col gap-4 text-green-600 text-sm mt-8 ml-3">
//                         <li><b>Free cancellation</b> anytime</li>
//                         <li><b>No prepayment needed</b> - pay at the property</li>
//                         <li><b>No credit card needed</b></li>
//                     </div>
//                     {/* <div className='mt-2 w-full h-full flex flex-col-reverse p-2'>
//                         <Button>I'll Reserve This only</Button>
//                     </div> */}
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default HotelRoom


"use client"

import type { propertyRooms } from '@/app/(main)/hotels/[hotelId]/page'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type React from 'react'
import { useState } from 'react'
import { Button } from './ui/button'
import type { selectedRoomsData } from './HotelRoomWrapper'
import Image from 'next/image'

const capacityIcon = "https://cdn-icons-png.flaticon.com/512/456/456212.png"

function HotelRoom({ props, numberOfNights, selectedRoomsData, setSelectedRoomsData }: {
    props: propertyRooms | undefined,
    numberOfNights: number,
    selectedRoomsData: selectedRoomsData[],
    setSelectedRoomsData: React.Dispatch<React.SetStateAction<selectedRoomsData[]>>
}) {
    const capacityArray = Array(props?.capacity).fill(capacityIcon)
    const [selectedRooms, setSelectedRooms] = useState(1)
    const [showRoomControls, setShowRoomControls] = useState(false) // Controls visibility of increase/decrease buttons
    const pricePerNight = Number(props?.price.toFixed(0)) || 0;

    const maxRooms = props?.quantity ?? 0

    // Function to update selectedRoomsData state
    const updateSelectedRoomsData = (newSelectedRooms: number) => {
        const existingRoomIndex = selectedRoomsData.findIndex(room => room.id === props?.id)

        // Check if the room exists in the selectedRoomsData
        if (existingRoomIndex !== -1) {
            // If the room exists, make a copy of the selectedRoomsData and update the specific room
            const updatedRooms = [...selectedRoomsData]

            // Now, safely update the quantity and price
            if (updatedRooms[existingRoomIndex]) {
                updatedRooms[existingRoomIndex].quantity = newSelectedRooms
                updatedRooms[existingRoomIndex].unitPrice = pricePerNight
                updatedRooms[existingRoomIndex].totalPrice = pricePerNight * newSelectedRooms * numberOfNights
                setSelectedRoomsData(updatedRooms)
            }
        } else {
            // If room doesn't exist, add it to the selection
            setSelectedRoomsData([...selectedRoomsData, {
                id: props?.id ?? "",
                description: props?.description ?? "",
                title: props?.title ?? "",
                quantity: newSelectedRooms,
                unitPrice: pricePerNight,
                totalPrice: pricePerNight * newSelectedRooms * numberOfNights,
                roomType: props?.title ?? ""
            }])
        }
    }

    const handleIncrease = () => {
        if (selectedRooms < maxRooms) {
            const newSelectedRooms = selectedRooms + 1
            setSelectedRooms(newSelectedRooms)
            updateSelectedRoomsData(newSelectedRooms)
        }
    }

    const handleDecrease = () => {
        if (selectedRooms > 0) {
            const newSelectedRooms = selectedRooms - 1
            setSelectedRooms(newSelectedRooms)
            updateSelectedRoomsData(newSelectedRooms)
        }
    }

    const handleAddToSelection = () => {
        setShowRoomControls(true)
        updateSelectedRoomsData(selectedRooms)
        if (selectedRooms === 0) {
            setSelectedRooms(1) // Set at least 1 room if selectedRooms is 0
            updateSelectedRoomsData(selectedRooms + 1)
        }
    }

    if (selectedRooms === 0 && showRoomControls) {
        setShowRoomControls(false)
    }

    return (
        <div className='hotelRoomItem border border-gray-300 p-4 rounded flex flex-col lg:flex-row gap-6 mb-6'>
            <div className="flex flex-col gap-3 flex-1">
                <h1 className="hrTitle text-lg font-extrabold text-blue-800">{props?.title}</h1>
                <div className='hrDesc text-sm'>{props?.description}</div>
                <div className="text-base font-medium mt-6">Number of Guests</div>
                <div className='flex gap-2 '>
                    {capacityArray.map((icon, i) => (
                        <Image
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            key={i}
                            className="w-5"
                            src={capacityIcon}
                            alt="Capacity icon"
                            width={20}
                            height={20}
                        />
                    ))}
                </div>
                <div className=''>Available Rooms: {maxRooms}</div>
            </div>

            {/* Amenities Column */}
            <div className='flex-1'>
                <ul className='flex flex-col justify-start'>
                    {props?.amenities.map(amenity => (
                        <div key={amenity.id} className='mb-2 flex gap-2 items-center'>
                            <FontAwesomeIcon className='h-3' icon={faCheck} />
                            <li className='text-sm mb-3 pt-2'>{amenity.name}</li>
                        </div>
                    ))}
                </ul>
            </div>

            {/* Price & Booking Column */}
            {/* <div className='price w-full lg:w-72 flex justify-center'>
                <div className='flex flex-col items-center my-3'>
                    <div className='flex'>
                        <div className='font-semibold text-lg'>Price per Night: $</div>
                        <div className='flex text-xl font-bold'>{Number(props?.price.toFixed(0))}</div>
                    </div>
                    <div className="flex flex-col gap-4 text-green-600 text-sm mt-8 ml-3">
                        <li><b>Free cancellation</b> anytime</li>
                        <li><b>No prepayment needed</b> - pay at the property</li>
                        <li><b>No credit card needed</b></li>
                    </div>
                    <div className='mt-4'>
                        {showRoomControls ? (
                            <div className="flex gap-3 mt-3">
                                <Button onClick={handleDecrease} disabled={selectedRooms <= 0}>-</Button>
                                <span>{selectedRooms}</span>
                                <Button onClick={handleIncrease} disabled={selectedRooms >= maxRooms}>+</Button>
                            </div>
                        ) : (
                            <Button onClick={handleAddToSelection}>Add to Selection</Button>
                        )}
                    </div>
                </div>
            </div> */}
            <div className="flex flex-col items-start lg:items-center flex-1">
                <div className="flex items-center mb-2">
                    <span className="font-semibold text-lg">Price per Night: $</span>
                    <span className="text-xl font-bold ml-2">{pricePerNight}</span>
                </div>

                <ul className="text-green-600 text-sm mt-2 space-y-1">
                    <li><b>Free cancellation</b> anytime</li>
                    <li><b>No prepayment needed</b> – pay at the property</li>
                    <li><b>No credit card needed</b></li>
                </ul>

                <div className="mt-4 w-full flex justify-center">
                    {showRoomControls ? (
                        <div className="flex gap-3 items-center">
                            <Button onClick={handleDecrease} disabled={selectedRooms <= 0}>-</Button>
                            <span>{selectedRooms}</span>
                            <Button onClick={handleIncrease} disabled={selectedRooms >= maxRooms}>+</Button>
                        </div>
                    ) : (
                        <Button onClick={handleAddToSelection}>Add to Selection</Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HotelRoom
