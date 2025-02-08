'use client';

import type { selectedRoomsData } from "./HotelRoomWrapper";

export interface bookingSummaryProps {
    selectedRooms: selectedRoomsData[],
    totalPrice: number,
    numberOfNights: number,
    from: string,
    to: string,
    propertyName: string
}

const BookingSummary = ({ selectedRooms, totalPrice, numberOfNights, from, to, propertyName }: bookingSummaryProps) => {
    return (
        <div className="border border-gray-200 rounded-lg p-6">
            {/* Hotel Name */}
            <div className="mb-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800">{propertyName}</h2>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>

            {/* Display Check-In, Check-Out, and Number of Nights */}
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-700">Check-In Date:</div>
                    <div className="text-gray-600">{from}</div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div className="font-medium text-gray-700">Check-Out Date:</div>
                    <div className="text-gray-600">{to}</div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div className="font-medium text-gray-700">Number of Nights:</div>
                    <div className="text-gray-600">{numberOfNights}</div>
                </div>
            </div>

            {/* Display Selected Rooms */}
            <div className="space-y-4">
                {selectedRooms.map((room: selectedRoomsData) => (
                    <div key={room.id} className="flex justify-between items-center">
                        <div>
                            <h4 className="font-medium text-gray-700">{room.title}</h4>
                            <p className="text-sm text-gray-500">{room.description}</p>
                        </div>
                        <div className="text-gray-600">
                            {room.quantity} x ${room.price} = ${(room.quantity * room.price).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Price */}
            <div className="mt-6 border-t pt-4 flex justify-between">
                <div className="text-lg font-semibold text-gray-800">Total Price</div>
                <div className="text-xl font-bold text-blue-600">${totalPrice.toFixed(2)}</div>
            </div>
        </div>
    );
};




export default BookingSummary;
