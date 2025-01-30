import { db } from "../../../server/db";

export async function registerUser(username: string, email: string, password: string) {
    try {
        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { existingUser, success: false, message: "Email already in use." };
        }

        // Hash password
        // const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = password;

        // Create new user
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        console.log(newUser)

        if (newUser){
            return { newUser, success: true };
        }
        return { success: false, message: "Something went wrong." };

    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, message: "Something went wrong." };
    }
}
