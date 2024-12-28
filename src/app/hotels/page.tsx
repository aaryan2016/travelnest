import SearchItem from "@/components/SearchItem";
import { db } from "../../server/db";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import { format } from "date-fns"

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        destination: string,
        from: string,
        to: string,
        adult: string,
        children: string,
        rooms: string,
    }
}) {

    //@ts-ignore
    const { destination, from, to, adult, children, rooms } = await searchParams
    console.log("destination:", destination)
    console.log("from:", from)
    console.log("to:", to)
    console.log("adult:", adult)
    console.log("children:", children)
    console.log("rooms:", rooms)
    // const properties = await fetchProperties({ destination })
    return (
        <div>
            <Navbar />
            {/* <div className="homeContainer mt-12 flex flex-col items-center gap-8"> */}
            {/* <div className="w-[1024]">
                    <h2>Search Results:</h2>
                    <p>
                        {properties[0]?.title}, {properties[0]?.city}
                    </p>
                </div> */}
            {/* </div> */}
            <div className="listContainer flex justify-center mt-5">
                <div className="listWrapper w-full max-w-screen-lg flex gap-5">
                    <div className="listSearch flex-1 p-3 rounded-xl sticky h-max top-3 bg-[#febb02]">
                        <h1 className="lsTitle text-xl text-gray-700 font-bold mb-3">Search</h1>
                        <div className="listItem flex flex-col gap-1 mb-2">
                            <label
                                className="text-sm"
                                htmlFor="">Destination</label>
                            <input
                                className="h-8 border-none p-1 mb-2"
                                placeholder={destination} type="text" />
                            <label
                                className="text-sm"
                                htmlFor="">Check-in Date</label>
                            <span
                                className="h-8 p-1 bg-white mb-2 flex items-center cursor-pointer"
                            >{`${format(from, "dd-MMM-yyyy")} to ${format(to, "dd-MMM-yyyy")}`}</span>
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
                                            placeholder={adult}
                                            min={1}
                                            type="number" />
                                    </div>
                                    <div className="lsOptionItem flex justify-between mb-2 text-gray-700 text-sm">
                                        <span className="lsOptionText">
                                            Children
                                        </span>
                                        <input
                                            className="lsOptionInput w-16 text-center"
                                            placeholder={children}
                                            min={0}
                                            type="number" />
                                    </div>
                                    <div className="lsOptionItem flex justify-between mb-2 text-gray-700 text-sm">
                                        <span className="lsOptionText">
                                            Room
                                        </span>
                                        <input
                                            className="lsOptionInput w-16 text-center"
                                            placeholder={rooms}
                                            min={1}
                                            type="number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button className="p-3 bg-blue-900 text-white w-full font-semibold">
                            Search
                        </Button>
                    </div>
                    <div className="listResult flex-[3_3_0%]">
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                    </div>
                </div>
            </div>

        </div>
    );
};

export const fetchProperties = ({ destination }: { destination: string }) => {
    const res = db.property.findMany({
        where: {
            city: { contains: destination, mode: 'insensitive' }
        }
    })
    return res;
}