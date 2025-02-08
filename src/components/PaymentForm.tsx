"use client"
import { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { createBooking } from '@/app/actions';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';
import type { selectedRoomsData } from './HotelRoomWrapper';

export interface BookingState {
    message: string;
    success: boolean;
    errors?: { cardNumber?: string; expiryDate?: string; cvv?: string };
}

const initialState: BookingState = {
    message: "",
    success: false,
    errors: {},
};

export interface PaymentFormProps {
    totalPrice: number;
    propertyName: string;
    numberOfNights: number;
    from: string;
    to: string;
    selectedRooms: selectedRoomsData[];
}

const PaymentForm = ({
    totalPrice,
    propertyName,
    numberOfNights,
    from,
    to,
    selectedRooms,
}: PaymentFormProps) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [state, formAction] = useActionState(createBooking, initialState);
    const router = useRouter();

    // useEffect(() => {
    //     if (state.success) {
    //         router.push("/booking/confirmation");
    //     }
    // }, [state.success, router]);

    return (
        <div className="flex min-h-fit p-4">
            <form action={formAction} className="space-y-6 w-96">
                <div>
                    <Label htmlFor="cardNumber" className="text-gray-700 font-semibold">Card Number</Label>
                    <Input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        placeholder='1234 5678 9876 5432'
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={16}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm"
                    />
                    {state.errors?.cardNumber && <p className="text-sm text-red-500">{state.errors.cardNumber}</p>}
                </div>
                <div>
                    <Label htmlFor="expiryDate" className="text-gray-700 font-semibold">Expiry Date (MM/YY)</Label>
                    <Input
                        id="expiryDate"
                        name="expiryDate"
                        type="text"
                        placeholder='MM/YY'
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        maxLength={5}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm"
                    />
                    {state.errors?.expiryDate && <p className="text-sm text-red-500">{state.errors.expiryDate}</p>}
                </div>
                <div>
                    <Label htmlFor="cvv" className="text-gray-700 font-semibold">CVV</Label>
                    <Input
                        id="cvv"
                        name="cvv"
                        type="text"
                        placeholder='123'
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={3}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm"
                    />
                    {state.errors?.cvv && <p className="text-sm text-red-500">{state.errors.cvv}</p>}
                </div>
                <div>
                    <Input
                        name="checkInDate"
                        type="text"
                        defaultValue={from}
                        className="hidden"
                    />
                    <Input
                        name="checkOutDate"
                        type="text"
                        defaultValue={to}
                        className="hidden"
                    />
                    <Input
                        name="totalPrice"
                        type="text"
                        defaultValue={totalPrice}
                        className="hidden"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md shadow-md"
                >
                    {isProcessing ? <Loader2 className="animate-spin" /> : "Submit Booking"}
                </Button>
                {state.message && (
                    <p className={`text-sm text-center mt-2 ${state.success ? "text-green-500" : "text-red-500"}`}>
                        {state.message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default PaymentForm;
