// 'use client'
// import { Button } from "@/components/ui/button"
// import { useSession, signIn, signOut } from "next-auth/react"

// export default function Component() {
//     const { data: session } = useSession()
//     if (session) {
//         return (
//             <>
//                 Signed in as {session.user.email} <br />
//                 <Button variant={"destructive"} onClick={() => signOut()}>Sign out</Button>
//                 {/* <button onClick={() => signOut()}>Sign out</button> */}
//             </>
//         )
//     }
//     return (
//         <>
//             Not signed in <br />
//             <Button onClick={() => signIn()}>Sign in</Button>
//             {/* <button onClick={() => signIn()}>Sign in</button> */}
//         </>
//     )
// }

'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface SignInFormInputs {
    identifier: string;
    password: string;
}

export default function SignInPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormInputs>();
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const errorMsg = searchParams.get('error') ? 'Invalid credentials. Please try again.' : '';

    const onSubmit: SubmitHandler<SignInFormInputs> = async (data: { identifier: any; password: any; }) => {
        setLoading(true);
        const result = await signIn('credentials', {
            identifier: data.identifier,
            password: data.password,
            redirect: false,
        });
        setLoading(false);

        if (result?.error) {
            router.push(`/sign-in?error=true`);
        } else {
            router.push(callbackUrl);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                    {errorMsg && <p className="mb-4 text-center text-red-500">{errorMsg}</p>}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="identifier">Email or Username</Label>
                            <Input id="identifier" {...register('identifier', { required: 'This field is required' })} />
                            {errors.identifier && <p className="text-sm text-red-500">
                                {errors.identifier.message} </p>}
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" {...register('password', { required: 'Password is required' })} />
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
