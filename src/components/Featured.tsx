import React from 'react'

function Featured() {
    return (
        <div className='featured w-full max-w-screen-lg flex justify-between gap-5'>
            <div className="fetauredItem relative rounded-xl overflow-hidden h-52 text-white bg-yellow-600">
                <img className='featuredImg w-80 object-cover' src="https://media.cntraveller.com/photos/611bf0fb7048754865719e3a/1:1/w_800%2Cc_limit/view-of-the-liffey-from-liberty-hall-dublin-ireland-conde-nast-traveller-4feb16-Tara-Morgan.jpg" alt="dublin_city_image" />
                <div className="featuredTitles absolute bottom-5 left-5">
                    <h1 className='text-2xl font-bold'>Dublin</h1>
                    <h2 className='text-xl'>123 Properties</h2>
                </div>
            </div>
            <div className="fetauredItem relative rounded-xl overflow-hidden h-52 text-white bg-yellow-600">
                <img className='featuredImg w-80 object-cover' src="https://cdn.britannica.com/53/117753-050-04A97076/Austin-Texas.jpg" alt="dublin_city_image" />
                <div className="featuredTitles absolute bottom-5 left-5">
                    <h1 className='text-2xl font-bold'>Austin</h1>
                    <h2 className='text-xl'>532 Properties</h2>
                </div>
            </div>
            <div className="fetauredItem relative rounded-xl overflow-hidden h-52 text-white bg-yellow-600">
                <img className='featuredImg w-80 object-cover' src="https://www.redfin.com/blog/wp-content/uploads/2024/06/shutterstock_2362577175-945x630.webp" alt="reno_city_image" />
                <div className="featuredTitles absolute bottom-5 left-5">
                    <h1 className='text-2xl font-bold'>Reno</h1>
                    <h2 className='text-xl'>533 Properties</h2>
                </div>
            </div>
        </div>
    )
}

export default Featured