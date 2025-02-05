import SearchItem from "@/components/SearchItem";
import Navbar from "@/components/Navbar";
import SearchItemFilter from "@/components/SearchItemFilter";
import { fetchProperties } from "@/app/actions";

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
}[]

const calculateNights = (from: string, to: string) => {
    const fromDate = new Date(from)
    const toDate = new Date(to)
    const timeDiff = toDate.getTime() - fromDate.getTime()
    return timeDiff / (1000 * 3600 * 24) // Convert milliseconds to days
}

export default async function Page({
    searchParams,
}: {
    searchParams?: searchParams
}) {
    // Handle the case where searchParams is null or undefined
    if (!searchParams) {
        return <div>No search parameters provided</div>;
    }

    const { destination, from, to, adult, kids, rooms } = await searchParams

    const numberOfNights = calculateNights(from, to)
    const properties: propertiesData[] | null = await fetchProperties({ destination })
    console.log("length: ", properties?.length)
    console.log(properties)
    return (
        <div>
            {/* <Navbar /> */}
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
                        {(properties?.length) ?
                            properties?.map((property) => (
                                <SearchItem key={property.id} id={property?.id} title={property?.title} propertyType={property?.propertyType} rooms={property.rooms} />)
                            ) :
                            <p>No properties found for the location: {destination}</p>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};
