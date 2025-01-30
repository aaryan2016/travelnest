'use client';

import { useState, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Define form input types
type SignUpFormInputs = {
    username: string;
    email: string;
    password: string;
};

export default function SignUpPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormInputs>();

    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
        setLoading(true);
        startTransition(async () => {
            try {
                const registerUser = (await import("./registerUser")).registerUser;
                const result = await registerUser(data.username, data.email, data.password);

                if (result?.success) {
                    toast.success('Account created successfully!');
                    router.push('/sign-in');
                } else {
                    toast.error(result?.message || 'Something went wrong.');
                }
            } catch (error) {
                toast.error('Failed to register. Please try again.');
            }
            setLoading(false);
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-100 p-4">
            <Card className="w-full max-w-md shadow-lg rounded-xl bg-white border border-gray-200">
                <CardHeader className="bg-blue-600 text-white p-4 rounded-t-xl">
                    <CardTitle className="text-center text-2xl font-bold">Create an Account</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <Label htmlFor="username" className="text-gray-700 font-semibold">Username</Label>
                            <Input id="username" {...register('username', { required: 'Username is required' })} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
                            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
                            <Input id="email" type="email" {...register('email', { required: 'Email is required' })} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-gray-700 font-semibold">Password</Label>
                            <Input id="password" type="password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md shadow-md" disabled={loading || isPending}>
                            {(loading || isPending) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign Up'}
                        </Button>
                    </form>
                    <p className="text-center text-gray-600 mt-4">Already have an account? <a href="/sign-in" className="text-blue-600 hover:underline">Sign in</a></p>
                </CardContent>
            </Card>
        </div>
    );
}