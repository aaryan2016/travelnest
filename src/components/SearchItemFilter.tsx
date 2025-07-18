"use client"
import type React from 'react'
import { useState, Suspense } from 'react'
import type { SearchParams } from '@/app/(main)/hotels/page'
import { Button } from './ui/button'
import type { DateRange } from 'react-day-picker'
import { DatePickerWithRange } from './ui/DatePickerWithRange'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface filterOptions {
    adult: string,
    kids: string,
    rooms: string,
}

function FilterContent({ destination, from, to, adult, kids, rooms }: SearchParams) {
    const [filterDestination, setFilterDestination] = useState<string>(destination)
    const [filterDate, setFilterDate] = useState<DateRange | undefined>({
        from: new Date(from),
        to: new Date(to)
    })
    const [filterOptions, setFilterOptions] = useState<filterOptions>({
        adult: adult,
        kids: kids,
        rooms: rooms
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof filterOptions) => {
        const value = e.target.value

        // Update the specific key in the state
        setFilterOptions((prevState) => ({
            ...prevState,
            [key]: value
        }))
    }

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const handleSearch = () => {
        // Prepare query parameters
        const query: Record<string, string | undefined> = {
            destination: filterDestination,
            from: filterDate?.from?.toISOString().slice(0, 10), // Convert date to string
            to: filterDate?.to?.toISOString().slice(0, 10),     // Convert date to string
            adult: filterOptions.adult,
            kids: filterOptions.kids,
            rooms: filterOptions.rooms,
        };

        console.log("filter query: ", query)

        const params = new URLSearchParams(searchParams);
        void ((query.destination) ? params.set("destination", query.destination) : params.delete("destination"));
        void ((query.from) ? params.set("from", query.from) : params.delete("from"));
        void ((query.to) ? params.set("to", query.to) : params.delete("to"));
        void ((query.adult) ? params.set("adult", query.adult) : params.delete("adult"));
        void ((query.kids) ? params.set("kids", query.kids) : params.delete("kids"));
        void ((query.rooms) ? params.set("rooms", query.rooms) : params.delete("rooms"));

        router.replace(`${pathname}?${params}`)
    }

    return (
        <div className="listSearch p-3 rounded-xl sticky h-max top-3 bg-[#febb02]">
            <h1 className="lsTitle text-xl text-gray-700 font-bold mb-3">Search</h1>
            <div className="listItem flex flex-col gap-1 mb-2">
                <label
                    className="text-sm"
                    htmlFor="">Destination</label>
                <input
                    className="h-9 border-none py-2 px-4 mb-2 rounded-md"
                    placeholder={destination}
                    type="text"
                    onChange={(e) => { setFilterDestination(e.target.value) }} />
                <label
                    className="text-sm"
                    htmlFor="">Check-in Date</label>
                {/* <span
                    className="h-8 p-1 bg-white mb-2 flex items-center cursor-pointer"
                >{`${format(from, "dd-MMM-yyyy")} to ${format(to, "dd-MMM-yyyy")}`}</span> */}

                <div className='h-8 mb-2 broder-4 border-black'>
                    <DatePickerWithRange date={filterDate} setDate={setFilterDate} className='text-slate-300' />
                </div>

                <div className="lsItem flex flex-col gap-1 mb-2">
                    <label
                        className="text-sm"
                        htmlFor="">Options</label>
                    <div className="lsOptions p-3">
                        <div className="lsOptionItem flex justify-between mb-2 text-gray-700 text-sm">
                            <span className="lsOptionText">
                                Min Price <small>per night</small>
                            </span>
                            <input
                                className="lsOptionInput w-16 text-center"
                                min={0}
                                type="number" />
                        </div>
                        <div className="lsOptionItem flex justify-between mb-2 text-gray-700 text-sm">
                            <span className="lsOptionText">
                                Max Price <small>per night</small>
                            </span>
                            <input
                                className="lsOptionInput w-16 text-center"
                                min={0}
                                type="number" />
                        </div>
                        <div className="lsOptionItem flex justify-between mb-2 text-gray-700 text-sm">
                            <span className="lsOptionText">
                                Adults
                            </span>
                            <input
                                className="lsOptionInput w-16 text-center"
                                placeholder={filterOptions.adult}
                                onChange={(e) => handleInputChange(e, 'adult')}
                                min={1}
                                type="number" />
                        </div>
                        <div className="lsOptionItem flex justify-between mb-2 text-gray-700 text-sm">
                            <span className="lsOptionText">
                                Children
                            </span>
                            <input
                                className="lsOptionInput w-16 text-center"
                                placeholder={filterOptions.kids}
                                onChange={(e) => handleInputChange(e, 'kids')}
                                min={0}
                                type="number" />
                        </div>
                        <div className="lsOptionItem flex justify-between mb-2 text-gray-700 text-sm">
                            <span className="lsOptionText">
                                Room
                            </span>
                            <input
                                className="lsOptionInput w-16 text-center"
                                placeholder={filterOptions.rooms}
                                onChange={(e) => handleInputChange(e, 'rooms')}
                                min={1}
                                type="number" />
                        </div>
                    </div>
                </div>
            </div>
            <Button
                className="p-3 bg-blue-900 text-white w-full font-semibold"
                onClick={handleSearch}
            >
                Search
            </Button>
        </div>
    )
}

export default function SearchItemFilter(props: SearchParams) {
    return (
        <Suspense fallback={
            <div className="listSearch flex-1 p-3 rounded-xl sticky h-max top-3 bg-[#febb02]">
                Loading...
            </div>
        }>
            <FilterContent {...props} />
        </Suspense>
    );
}