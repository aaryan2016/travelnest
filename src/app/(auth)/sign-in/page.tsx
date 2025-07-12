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

// 'use client';

// import { useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { signIn } from 'next-auth/react';
// import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Loader2 } from 'lucide-react';

// interface SignInFormInputs {
//     identifier: string;
//     password: string;
// }

// export default function SignInPage() {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<SignInFormInputs>();
//     const [loading, setLoading] = useState(false);
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const callbackUrl = searchParams.get('callbackUrl') || '/';
//     const errorMsg = searchParams.get('error') ? 'Invalid credentials. Please try again.' : '';

//     const onSubmit: SubmitHandler<SignInFormInputs> = async (data: { identifier: any; password: any; }) => {
//         setLoading(true);
//         const result = await signIn('credentials', {
//             identifier: data.identifier,
//             password: data.password,
//             redirect: false,
//         });
//         setLoading(false);

//         if (result?.error) {
//             router.push(`/sign-in?error=true`);
//         } else {
//             router.push(callbackUrl);
//         }
//     };

//     return (
//         <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
//             <Card className="w-full max-w-md shadow-lg">
//                 <CardHeader>
//                     <CardTitle className="text-center text-2xl font-bold">Sign In</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     {errorMsg && <p className="mb-4 text-center text-red-500">{errorMsg}</p>}
//                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                         <div>
//                             <Label htmlFor="identifier">Email or Username</Label>
//                             <Input id="identifier" {...register('identifier', { required: 'This field is required' })} />
//                             {errors.identifier && <p className="text-sm text-red-500">
//                                 {errors.identifier.message} </p>}
//                         </div>
//                         <div>
//                             <Label htmlFor="password">Password</Label>
//                             <Input id="password" type="password" {...register('password', { required: 'Password is required' })} />
//                             {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
//                         </div>
//                         <Button type="submit" className="w-full" disabled={loading}>
//                             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
//                         </Button>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

'use client';

import { useState, Suspense, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

// Define form input types
type SignInFormInputs = {
    identifier: string;
    password: string;
};

// Component to handle search params
function SearchParamsHandler({
    onParamsReady
}: {
    onParamsReady: (params: { callbackUrl: string; errorMsg: string }) => void
}) {
    const searchParams = useSearchParams();
    const callbackUrl = decodeURIComponent(searchParams.get('callbackUrl') ?? '/');
    // console.log("paramsCallBackURL: ", callbackUrl)
    const errorMsg = searchParams.get('error') ? 'Invalid credentials. Please try again.' : '';

    useEffect(() => {
        onParamsReady({ callbackUrl, errorMsg });
    }, [callbackUrl, errorMsg, onParamsReady]);

    return null;
}

export default function SignInPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormInputs>(); // Ensure the type is passed to useForm

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [params, setParams] = useState({ callbackUrl: '/', errorMsg: '' });

    const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
        setLoading(true);
        // Get the current callbackUrl from search params
        const callbackUrl = params.callbackUrl || '/';  // fallback to '/' if no callbackUrl
        // console.log("onSubmit callbackUrl: ", callbackUrl)

        const result = await signIn('credentials', {
            identifier: data.identifier,
            password: data.password,
            redirect: false,
            callbackUrl: callbackUrl,
        });
        setLoading(false);
        // console.log("result: ", result)

        if (result?.status !== 200) {
            router.push(`/sign-in?error=true&callbackUrl=${callbackUrl}`);
        } else if (result.ok) {
            router.push(callbackUrl);
        } else {
            console.log("else callbackUrl: ", callbackUrl)
            router.push(callbackUrl);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-100 p-4">
            {/* <Suspense fallback={<div>Loading...</div>}>
                <SearchParamsHandler onParamsReady={setParams} />
            </Suspense> */}
            <Card className="w-full max-w-lg sm:max-w-md lg:max-w-sm xl:max-w-md shadow-lg rounded-xl bg-white border border-gray-200">
                <CardHeader className="bg-blue-600 text-white p-4 rounded-t-xl">
                    <CardTitle className="text-center text-2xl font-bold">Sign in to your account</CardTitle>
                </CardHeader>
                <Suspense fallback={<div>Loading...</div>}>
                    <SearchParamsHandler onParamsReady={setParams} />
                </Suspense>
                <CardContent className="p-6">
                    {params.errorMsg && <p className="mb-4 text-center text-red-500">{params.errorMsg}</p>}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <Label htmlFor="identifier" className="text-gray-700 font-semibold">Email or Username</Label>
                            <Input id="identifier" {...register('identifier', { required: 'This field is required' })} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
                            {errors.identifier && <p className="text-sm text-red-500">{errors.identifier.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-gray-700 font-semibold">Password</Label>
                            <Input id="password" type="password" {...register('password', { required: 'Password is required' })} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md shadow-md" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
                        </Button>
                    </form>
                    <p className="text-center text-gray-600 mt-4">Don&apos;t have an account? <a href="/sign-up" className="text-blue-600 hover:underline">Sign up</a></p>
                </CardContent>
            </Card>
        </div>
    );
}
