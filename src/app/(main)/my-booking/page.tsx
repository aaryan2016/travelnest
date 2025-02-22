'use server'

import { Suspense } from 'react';
import clsx from 'clsx';
import BookingCard from '@/components/BookingCard';
import { getBookings } from '@/app/actions';

const MyBooking = () => {
    return (
        // <div className="container mx-auto p-6">
        <div className="listContainer flex justify-center mt-5">
            <div className="listWrapper w-full max-w-screen-lg flex flex-col">
                <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
                <div className='flex p-2'>
                    {/* Using Suspense for loading state */}
                    <Suspense fallback={<p>Loading bookings...</p>}>
                        <BookingsList />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

// Fetching bookings and rendering them
const BookingsList = async () => {
    const bookings = await getBookings(); // Server Action fetches bookings

    return (
        <div className="flex flex-wrap">
            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    <div className="BookingCardWrapper w-1/3 p-1" key={booking.id}>
                        <BookingCard booking={booking} />
                    </div>
                ))
            ) : (
                <p className={clsx('text-xl text-center text-gray-600')}>
                    You have no bookings yet.
                </p>
            )}
        </div>
    );
};

export default MyBooking;
