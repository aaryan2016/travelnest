// "use server"

// import { db } from "../../../server/db";

// type RegisterState = {
//     message: string;
//     success: boolean;
//     errors?: { username?: string; email?: string; password?: string };
// }

// export async function registerUser( prevState: RegisterState,formData: FormData,): Promise<RegisterState>  {
//     try {
//         // Check if user already exists
//         const email = formData.get("email")?.toString()
//         const username = formData.get("username")?.toString() || ""
//         const password = formData.get("password")?.toString() || ""
        
//         if (!email || !username || !password) {
//             return { message: "All fields are required.", success: false };
//         }

//         console.log("From action: ", email)
//         const existingUser = await db.user.findUnique({
//             where: { email },
//         });

//         if (existingUser) {
//             return { message: "Email already in use.", success: false };
//         }

//         // Hash password
//         // const hashedPassword = await bcrypt.hash(password, 10);
//         const hashedPassword = password;

//         // Create new user
//         const newUser = await db.user.create({
//             data: {
//                 username,
//                 email,
//                 password: hashedPassword,
//             },
//         });
//         console.log("User Created:", newUser);

//         if (newUser){
//             return { message: "Account created successfully!", success: true };
//         }
//         return {message: "Something went wrong.", success: false };

//     } catch (error) {
//         console.error("Registration error:", error);
//         return { message: "Something went wrong.",success: false };
//     }
// }


"use server";

import { db } from "@/server/db";
import bcrypt from "bcryptjs";

interface RegisterState {
    message: string;
    success: boolean;
    errors?: { username?: string; email?: string; password?: string };
}

export async function registerUser(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
    const email = formData.get("email")?.toString().trim() || "";
    const username = formData.get("username")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";

    const errors: RegisterState["errors"] = {};

    // ✅ Validate inputs
    if (!username || username.length < 3) {
        errors.username = "Username must be at least 3 characters long.";
    }
    if (!email || !email.includes("@")) {
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
        // const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = password;

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
