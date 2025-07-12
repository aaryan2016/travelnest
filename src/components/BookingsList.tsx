import { getBookings } from "@/app/actions";
import BookingCard from "./BookingCard";

// Fetching bookings and rendering them
const BookingsList = async () => {
    const bookings = await getBookings(); // Server Action fetches bookings

    // Check if the user is not logged in (bookings is null)
    if (bookings === null) {
        return (
            <div className="flex justify-center mt-5">
                <p className="text-xl text-gray-600">Please log in to view your bookings.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap">
            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    <div className="BookingCardWrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" key={booking.id}>
                        <BookingCard booking={booking} />
                    </div>
                ))
            ) : (
                <p className='text-xl text-center text-gray-600'>
                    You have no bookings yet.
                </p>
            )}
        </div>
    );
};

export default BookingsList;