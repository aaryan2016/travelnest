import SearchItem from "@/components/SearchItem";
import { db } from "../../server/db";
import Navbar from "@/components/Navbar";
import SearchItemFilter from "@/components/SearchItemFilter";

export interface searchParams {
    destination: string,
    from: string,
    to: string,
    adult: string,
    kids: string,
    rooms: string,
}

export interface propertiesData {
    id: string,
    title: string,
    propertyType: "HOTEL" | "APARTMENT" | "RESORT" | "VILLA" | "GUESTHOUSE",
    rooms: {
        id: string,
        price: number
    }[]
}

export default async function Page({
    searchParams,
}: {
    searchParams?: searchParams
}) {

    //@ts-ignore
    const { destination, from, to, adult, kids, rooms } = await searchParams

    const properties = await fetchProperties({ destination })
    console.log(properties)
    return (
        <div>
            <Navbar />
            <div className="listContainer flex justify-center mt-5">
                <div className="listWrapper w-full max-w-screen-lg flex gap-5">
                    <SearchItemFilter
                        destination={destination}
                        from={from}
                        to={to}
                        adult={adult}
                        kids={kids}
                        rooms={rooms}
                    />
                    <div className="listResult flex-[3_3_0%]">
                        {properties.map((property) => (
                            <SearchItem key={property.id} id={property?.id} title={property?.title} propertyType={property?.propertyType} rooms={property.rooms} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export const fetchProperties = ({ destination }: { destination: string }) => {
    const res = db.property.findMany({
        where: {
            city: { contains: destination, mode: 'insensitive' },
        },
        select: {
            id: true, title: true, propertyType: true,
            rooms: { select: { id: true, price: true } }
        }
    })
    return res;
}