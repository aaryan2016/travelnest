'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className='flex justify-center item-center'>
            <div className="flex flex-col gap-4 pb-24 pt-1 w-full max-w-screen-lg justify-center">
                {/* <div className="flex flex-col justify-between gap-4 lg:flex-row">
                    <Skeleton className="h-8 w-3/4 md:w-1/2" />
                    <Skeleton className="h-10 w-full lg:w-64" />
                </div> */}
                <div className="flex justify-start mt-5 gap-6">
                    <Skeleton className="h-96 w-1/4" />
                    <div className="grid grid-cols-1 gap-5 w-full">
                        {[1, 2, 3, 4, 5, 6].map((v) => (
                            <div key={v} className="flex flex-col space-y-2">
                                <Skeleton className="h-48 w-full" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}