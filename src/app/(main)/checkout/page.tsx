import PaymentForm from '@/components/PaymentForm';
import BookingSummary from '@/components/BookingSummary';
import type { selectedRoomsData } from '@/components/HotelRoomWrapper';
import DownloadReceiptButton from '@/components/DownloadReceiptButton'

export interface SearchParams {
    selectedRooms: string;
    from: string;
    to: string;
    numberOfNights: number;
    propertyName: string;
}

async function CheckoutPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const resolvedParams: SearchParams = await searchParams;

    if (!resolvedParams) {
        return <div>No search parameters provided</div>;
    }

    const { selectedRooms, from, to, numberOfNights, propertyName } = resolvedParams;
    console.log("selectedRooms: ", selectedRooms)

    let parsedRooms: selectedRoomsData[] = [];
    try {
        parsedRooms = selectedRooms ? JSON.parse(selectedRooms) as selectedRoomsData[] : [];
    } catch (error) {
        console.error(error);
        return <div>Invalid rooms data. Please make sure the data is correct.</div>;
    }

    // Filter out rooms with quantity 0
    const filteredRooms = parsedRooms.filter(room => room.quantity > 0);

    const fromDate = from;
    const toDate = to;
    const numNights = numberOfNights;

    // Calculate the total price from the selected rooms
    const totalPrice = filteredRooms.reduce((sum: number, room: selectedRoomsData) => {
        return sum + room.unitPrice * room.quantity;
    }, 0);

    // Assuming the hotel name is either in the `selectedRooms` or passed from elsewhere
    // const hotelName = "Grand Hotel"; // You can change this to dynamically fetch the hotel name if available

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-6">
            <div className="max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Checkout</h1>

                {/* Booking Summary */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Booking Summary</h2>
                    <BookingSummary
                        selectedRooms={filteredRooms}
                        totalPrice={totalPrice}
                        numberOfNights={numNights}
                        from={fromDate}
                        to={toDate}
                        propertyName={propertyName}
                    />
                </div>

                {/* Payment Form */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700">Payment Details</h2>
                    <PaymentForm
                        selectedRooms={parsedRooms}
                        totalPrice={totalPrice}
                        propertyName={propertyName}
                        numberOfNights={numNights}
                        from={fromDate}
                        to={toDate}
                    />
                </div>
                <DownloadReceiptButton
                    selectedRooms={filteredRooms}
                    totalPrice={totalPrice}
                    numberOfNights={numNights}
                    from={fromDate}
                    to={toDate}
                    propertyName={propertyName}
                />
            </div>
        </div>
    );
}

export default CheckoutPage;