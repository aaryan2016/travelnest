// 'use client';

// import { useState, useTransition } from 'react';
// import { useForm, type SubmitHandler } from 'react-hook-form';
// import { useRouter } from 'next/navigation';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Loader2 } from 'lucide-react';
// import { toast } from 'react-hot-toast';
// import { registerUser } from './registerUser';
// import { useActionState } from "react";

// // Define form input types
// export type SignUpFormInputs = {
//     username: string;
//     email: string;
//     password: string;
// };


// export default function SignUpPage() {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<SignUpFormInputs>();

//     const [loading, setLoading] = useState(false);
//     const [isPending, startTransition] = useTransition();
//     const router = useRouter();

//     // const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
//     //     console.log("register button clicked.")
//     //     setLoading(true);
//     //     startTransition(async () => {
//     //         try {
//     //             const registerUser = (await import("./registerUser")).registerUser;
//     //             const result = await registerUser(data.username, data.email, data.password);

//     //             if (result?.success) {
//     //                 toast.success('Account created successfully!');
//     //                 router.push('/sign-in');
//     //             } else {
//     //                 toast.error(result?.message || 'Something went wrong.');
//     //             }
//     //         } catch (error) {
//     //             toast.error('Failed to register. Please try again.');
//     //         }
//     //         setLoading(false);
//     //     });
//     // };

//     const initialState = {
//         message: "",
//         success: false,
//     };
//     const [state, formAction] = useActionState(registerUser, initialState);

//     return (
//         <div className="flex min-h-screen items-center justify-center bg-blue-100 p-4">
//             <Card className="w-full max-w-md shadow-lg rounded-xl bg-white border border-gray-200">
//                 <CardHeader className="bg-blue-600 text-white p-4 rounded-t-xl">
//                     <CardTitle className="text-center text-2xl font-bold">Create an Account</CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-6">
//                     <form action={formAction} className="space-y-6">
//                         <div>
//                             <Label htmlFor="username" className="text-gray-700 font-semibold">Username</Label>
//                             <Input name="username" className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
//                             {/* {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>} */}
//                         </div>
//                         <div>
//                             <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
//                             <Input name="email" type="email" className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
//                             {/* {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>} */}
//                         </div>
//                         <div>
//                             <Label htmlFor="password" className="text-gray-700 font-semibold">Password</Label>
//                             <Input name="password" type="password" className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
//                             {/* {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>} */}
//                         </div>
//                         {<p 
//                             className={state?.message}?`text-sm text-red-500>
//                                 {state?.message}
//                         </p>}
//                         <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md shadow-md" disabled={loading || isPending}>
//                             {(loading || isPending) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign Up'}
//                         </Button>
//                     </form>
//                     <p className="text-center text-gray-600 mt-4">Already have an account? <a href="/sign-in" className="text-blue-600 hover:underline">Sign in</a></p>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

'use client';

import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { registerUser } from "@/app/actions";

interface RegisterState {
    message: string;
    success: boolean;
    errors?: { username?: string; email?: string; password?: string };
}

const initialState: RegisterState = {
    message: "",
    success: false,
    errors: {},
};

export default function SignUpPage() {
    const [state, formAction] = useActionState(registerUser, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            router.push("/sign-in");
        }
    }, [state.success, router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-100 p-4">
            <Card className="w-full max-w-md shadow-lg rounded-xl bg-white border border-gray-200">
                <CardHeader className="bg-blue-600 text-white p-4 rounded-t-xl">
                    <CardTitle className="text-center text-2xl font-bold">Create an Account</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form action={formAction} className="space-y-6">
                        <div>
                            <Label htmlFor="username" className="text-gray-700 font-semibold">Username</Label>
                            <Input name="username" className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
                            {state.errors?.username && <p className="text-sm text-red-500">{state.errors.username}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
                            <Input name="email" type="email" className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
                            {state.errors?.email && <p className="text-sm text-red-500">{state.errors.email}</p>}
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-gray-700 font-semibold">Password</Label>
                            <Input name="password" type="password" className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
                            {state.errors?.password && <p className="text-sm text-red-500">{state.errors.password}</p>}
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md shadow-md">
                            Sign Up
                        </Button>
                        {state.message && (
                            <p className={`text-sm text-center mt-2 ${state.success ? "text-green-500" : "text-red-500"}`}>
                                {state.message}
                            </p>
                        )}
                    </form>
                    <p className="text-center text-gray-600 mt-4">
                        Already have an account? <a href="/sign-in" className="text-blue-600 hover:underline">Sign in</a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}