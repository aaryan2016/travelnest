import SearchItem from "@/components/SearchItem";
import SearchItemFilter from "@/components/SearchItemFilter";
import { fetchProperties } from "@/app/actions";

export interface SearchParams {
    destination: string;
    from: string;
    to: string;
    adult: string;
    kids: string;
    rooms: string;
}

export interface PropertiesData {
    id: string;
    title: string;
    propertyType: "HOTEL" | "APARTMENT" | "RESORT" | "VILLA" | "GUESTHOUSE";
    rooms: Array<{
        id: string;
        price: number;
    }>;
}

// const calculateNights = (from: string, to: string) => {
//     const fromDate = new Date(from);
//     const toDate = new Date(to);
//     const timeDiff = toDate.getTime() - fromDate.getTime();
//     return timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days
// };

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    // Await the searchParams if it's a Promise
    const resolvedSearchParams = await searchParams;

    const { destination, from, to, adult, kids, rooms } = resolvedSearchParams;

    // const numberOfNights = calculateNights(from, to);
    const properties: PropertiesData[] | null = await fetchProperties({ destination });
    console.log("length: ", properties?.length);
    console.log(properties);

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
                        {properties?.length ? (
                            properties.map((property) => (
                                <SearchItem
                                    key={property.id}
                                    id={property.id}
                                    title={property.title}
                                    propertyType={property.propertyType}
                                    rooms={property.rooms}
                                    from={from}
                                    to={to}
                                />
                            ))
                        ) : (
                            <p>No properties found for the location: {destination}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}