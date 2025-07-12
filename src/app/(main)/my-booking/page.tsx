'use server'

import { Suspense } from 'react';
import BookingsList from '@/components/BookingsList';

const MyBooking = () => {
    return (
        <main className="flex justify-center mt-5 px-4">
            <section className="w-full max-w-screen-lg flex flex-col">
                <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
                <Suspense fallback={<p>Loading bookings...</p>}>
                    <BookingsList />
                </Suspense>
            </section>
        </main>
    );
};



export default MyBooking;
