import { db } from "../../server/db";
import Navbar from "@/components/Navbar";
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
            <div className="listContainer bg-red-400 flex justify-center mt-5">
                <div className="listWrapper w-full max-w-screen-lg flex gap-5">
                    <div className="listSearch flex-1 p-3 rounded-xl sticky top-3 bg-yellow-300">
                        <h1 className="lsTitle text-xl text-gray-700 font-bold mb-3">Search</h1>
                        <div className="listItem">
                            <label htmlFor="">Destination</label>
                            <input type="text" />
                            <label htmlFor="">Check-in Date</label>
                            <span>{`${format(from, "dd-MMM-yyyy")} to ${format(to, "dd-MMM-yyyy")}`}</span>
                        </div>
                    </div>
                    <div className="listResult flex-[3_3_0%]">a</div>
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