import { string } from "zod";
import { db } from "../../server/db";
import Navbar from "@/components/Navbar";

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
    const properties = await fetchProperties({ destination })
    return (
        <div>
            <Navbar />
            <div className="homeContainer mt-12 flex flex-col items-center gap-8">
                <div className="w-[1024]">
                    <h2>Search Results:</h2>
                    <p>
                        {properties[0]?.title}, {properties[0]?.city}
                    </p>
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