"use server";

import { db } from "@/server/db";
import bcrypt from "bcryptjs";
import type { propertyData } from "./(main)/hotels/[hotelId]/page";
import type { PropertiesData } from "./(main)/hotels/page";
import type { BookingState } from "@/components/PaymentForm";
import { type Booking, BookingStatus, PaymentStatus, type Room } from "@prisma/client"; // Enum imports
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

interface RegisterState {
    message: string;
    success: boolean;
    errors?: { username?: string; email?: string; password?: string };
}

export async function registerUser(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
    const email = formData.get("email")?.toString().trim() ?? "";
    const username = formData.get("username")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const errors: RegisterState["errors"] = {};

    // ✅ Validate inputs
    if (!username || username.length < 3) {
        errors.username = "Username must be at least 3 characters long.";
    }
    if (!email?.includes("@")) {
        errors.email = "Please enter a valid email address.";
    }
    if (!password || password.length < 6) {
        errors.password = "Password must be at least 6 characters long.";
    }

    // If there are errors, return them immediately
    if (Object.keys(errors).length > 0) {
        return { message: "Validation errors occurred.", success: false, errors };
    }

    try {
        console.log("RegisterUser action received:", { username, email });

        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { message: "Email is already registered.", success: false, errors: { email: "Email is already in use." } };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // const hashedPassword = password;

        // Create new user
        await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        return { message: "Account created successfully!", success: true };
    } catch (error) {
        console.error("Registration error:", error);
        return { message: "An error occurred during registration. Please try again.", success: false };
    }
}

export const fetchProperties = async ({ destination }: { destination: string }): Promise<PropertiesData[] | null> => {
    const res = await db.property.findMany({
        where: {
            city: { contains: destination, mode: 'insensitive' },
        },
        select: {
            id: true,
            title: true,
            propertyType: true,
            rooms: { select: { id: true, price: true } }
        }
    })
    return res
}

export const fetchPropertyData = async ({ id }: { id: string }): Promise<propertyData | null> => {
    const res = await db.property.findFirst({
        where: {
            id
        },
        select: {
            id: true,
            title: true,
            description: true,
            address: true,
            city: true,
            ameneties: true,
            rooms: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    price: true,
                    capacity: true,
                    quantity: true,
                    amenities: {
                        select: {
                            id: true,
                            name: true,
                            icon: true,
                        }
                    }
                }
            }
        }
    })
    return res;
}

export async function createBooking(prevState: BookingState, formData: FormData): Promise<BookingState> {
    console.log({ formData, })
    const cardNumber = formData.get("cardNumber")?.toString() ?? "";
    const expiryDate = formData.get("expiryDate")?.toString() ?? "";
    const checkInDate = formData.get("checkInDate")?.toString() ?? "";
    const checkOutDate = formData.get("checkOutDate")?.toString() ?? "";
    const totalPrice = formData.get("totalPrice")?.toString() ?? "0";
    const cvv = formData.get("cvv")?.toString() ?? "";
    const selectedRooms = JSON.parse(formData.get("selectedRooms")?.toString() ?? "[]") as Room[]; // Make sure to send selectedRooms as a JSON string

    // Luhn Algorithm to validate credit card numbers
    const validateCardNumber = (cardNumber: string): boolean => {
        const regex = /^\d{16}$/;
        if (!regex.test(cardNumber)) return false;
        let sum = 0;
        let shouldDouble = false;
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = Number.parseInt(cardNumber.charAt(i));
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    };

    const session = await getServerSession(authOptions);
    console.log("session: ", session)
    if (!session?.user) {
        return { message: "You must be logged in to create a booking.", success: false };
    }
    const userMail = session.user.email;

    const errors: BookingState["errors"] = {};

    // Validation logic for card details
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
        errors.cardNumber = "Invalid card number.";
    }

    if (!cardNumber || !validateCardNumber(cardNumber)) {
        errors.cardNumber = "Invalid card number.";
    }

    if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        errors.expiryDate = "Invalid expiry date.";
    }

    if (!cvv || !/^\d{3}$/.test(cvv)) {
        errors.cvv = "Invalid CVV.";
    }

    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
        return { message: "Validation failed", success: false, errors };
    }

    try {
        // Create a new booking entry in the database
        await db.booking.create({
            data: {
                bookedByUser: {
                    connect: { email: userMail ?? "" }, // Link the user with the booking
                },
                checkInDate: new Date(checkInDate), // Example check-in date
                checkOutDate: new Date(checkOutDate), // Example check-out date
                noOfGuests: 1, // Example number of guests, should be taken from the form
                totalPrice: Number.parseInt(totalPrice), // Example total price, should be dynamic
                bookingStatus: BookingStatus.COMPLETED,
                paymrntStatus: PaymentStatus.PAID,
                roomsBooked: {
                    connect: selectedRooms.map((room: { id: string }) => ({ id: room.id })),
                },
            },
        });

        return { message: "Booking created successfully!", success: true };
    } catch (error) {
        console.error("Error during booking:", error);
        return { message: "An error occurred. Please try again.", success: false };
    }
}

// Server Action to fetch bookings
export async function getBookings(): Promise<(Booking & { roomsBooked: Room[] })[]> {
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
        throw new Error('Unauthorized - Please login first');
    }

    const userId = session.user._id;

    const bookings = await db.booking.findMany({
        where: { userId },
        include: {
            roomsBooked: true, // Only rooms, no property
        },
    });

    return bookings;
}