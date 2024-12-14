import { db } from "../../server/db";

export default async function SearchResults() {
    const properties = await fetchProperties()
    console.log(properties)
    return (
        <div>
            <h2>Search Results:</h2>
            <p>
                {properties[0]?.title}
            </p>
        </div>
    );
};

export const fetchProperties = () => {
    const res = db.property.findMany({
        where: {
            id: { equals: "property_123" }
        }
    })
    return res;
}