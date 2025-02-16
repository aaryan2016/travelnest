// import type { Booking, Room } from '@prisma/client';
// import clsx from 'clsx';

// interface BookingCardProps {
//     booking: Booking & { roomsBooked: Room[] };  // Ensure roomsBooked is correctly typed as an array of Room
// }

// const BookingCard = ({ booking }: BookingCardProps) => {
//     const { checkInDate, checkOutDate, roomsBooked, bookingStatus, paymrntStatus } = booking;

//     console.log("rooms booked: ", roomsBooked)

//     const formattedCheckInDate = new Date(checkInDate).toLocaleDateString();
//     const formattedCheckOutDate = new Date(checkOutDate).toLocaleDateString();

//     const bookingStatusClass = clsx({
//         'bg-green-100 text-green-800': bookingStatus === 'CONFIRMED',
//         'bg-red-100 text-red-800': bookingStatus === 'CANCELLED',
//         'bg-yellow-100 text-yellow-800': bookingStatus === 'PENDING',
//         'bg-blue-100 text-blue-800': bookingStatus === 'COMPLETED',
//     });

//     return (
//         <div className={clsx('border rounded-lg p-4 shadow-lg', bookingStatusClass)}>
//             <h3 className="text-xl font-semibold mb-2">Booking #{booking.id}</h3>
//             <div className="flex justify-between text-sm text-gray-600">
//                 <div>
//                     <p><strong>Check-in:</strong> {formattedCheckInDate}</p>
//                     <p><strong>Check-out:</strong> {formattedCheckOutDate}</p>
//                 </div>
//                 <div>
//                     <p><strong>Status:</strong> {bookingStatus}</p>
//                     <p><strong>Payment:</strong> {paymrntStatus}</p>
//                 </div>
//             </div>
//             <div className="mt-4">
//                 <h4 className="font-semibold">Rooms Booked:</h4>
//                 <ul className="list-disc pl-5">
//                     {roomsBooked.map((room) => (
//                         <li key={room.id} className="text-sm">
//                             {room.title} (x{room.quantity})
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default BookingCard;

//-----------------------------------------------------V2------------------------------------------------------
import type { FC } from 'react';
import { type Booking, type Room, BookingStatus, PaymentStatus } from '@prisma/client';
import { CheckCircleIcon, XCircleIcon, CalendarIcon, UsersIcon, CreditCardIcon } from 'lucide-react'; // Import icons

interface BookingCardProps {
    booking: Booking & { roomsBooked: Room[] };  // Using the updated Booking type without property
}

const BookingCard: FC<BookingCardProps> = ({ booking }) => {
    const {
        id,
        checkInDate,
        checkOutDate,
        noOfGuests,
        totalPrice,
        bookingStatus,
        paymrntStatus,
        roomsBooked,
    } = booking;

    // Format dates
    const formattedCheckIn = new Date(checkInDate).toLocaleDateString();
    const formattedCheckOut = new Date(checkOutDate).toLocaleDateString();

    // Define status icons
    const bookingStatusIcon = bookingStatus === BookingStatus.COMPLETED ? (
        <CheckCircleIcon className="text-green-500 w-5 h-5" />
    ) : (
        <XCircleIcon className="text-red-500 w-5 h-5" />
    );

    const paymentStatusIcon = paymrntStatus === PaymentStatus.PAID ? (
        <CheckCircleIcon className="text-green-500 w-5 h-5" />
    ) : (
        <XCircleIcon className="text-yellow-500 w-5 h-5" />
    );

    return (
        <div className="flex flex-col shadow-lg rounded-lg p-6 w-full space-y-4">
            {/* Booking Dates */}
            <div className="flex items-center text-sm text-gray-600 space-x-3">
                <div className="flex items-center space-x-1">
                    <CalendarIcon className="text-blue-500 w-4 h-4" />
                    <span>{formattedCheckIn} - {formattedCheckOut}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <UsersIcon className="text-teal-500 w-4 h-4" />
                    <span>{noOfGuests} Guests</span>
                </div>
            </div>

            {/* Booking Status */}
            <div className="flex items-center text-sm space-x-2">
                {bookingStatusIcon}
                <span className={`font-medium ${bookingStatus === BookingStatus.COMPLETED ? 'text-green-600' : 'text-red-600'}`}>
                    {bookingStatus === BookingStatus.COMPLETED ? 'Completed' : 'Cancelled'} Booking
                </span>
            </div>

            {/* Payment Status */}
            <div className="flex items-center text-sm space-x-2">
                {paymentStatusIcon}
                <span className={`font-medium ${paymrntStatus === PaymentStatus.PAID ? 'text-green-600' : 'text-yellow-600'}`}>
                    {paymrntStatus === PaymentStatus.PAID ? 'Done' : 'Pending'} Payment
                </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-1 text-lg font-semibold text-gray-800">
                <CreditCardIcon className="text-blue-600 w-5 h-5" />
                <span>Total: ${totalPrice.toFixed(2)}</span>
            </div>

            {/* Rooms booked */}
            <div className="text-sm text-gray-600 mt-3">
                <strong>Rooms booked:</strong>
                <ul className="list-disc pl-5">
                    {roomsBooked.map((room) => (
                        <li key={room.id}>
                            {room.title} - {room.quantity} rooms
                        </li>
                    ))}
                </ul>
            </div>

            {/* Action Button */}
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className="mt-4 w-full text-center text-blue-600 font-semibold py-2 px-4 border border-blue-600 rounded-md hover:bg-blue-50">
                View Details
            </button>
        </div>
    );
};

export default BookingCard;