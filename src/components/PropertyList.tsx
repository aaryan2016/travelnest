import Image from 'next/image'
import React from 'react'

interface property {
    propertyType: string,
    propertyCount: number,
    img: string
}
function PropertyList() {
    const properties: property[] = [
        {
            propertyType: "Hotel",
            propertyCount: 233,
            img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            propertyType: "Apartments",
            propertyCount: 2331,
            img: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            propertyType: "Resorts",
            propertyCount: 233,
            img: "https://images.pexels.com/photos/261388/pexels-photo-261388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            propertyType: "Villas",
            propertyCount: 233,
            img: "https://images.pexels.com/photos/17663281/pexels-photo-17663281/free-photo-of-mateus-palace-at-vila-real-portugal-juni-30-2023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            propertyType: "Cabins",
            propertyCount: 233,
            img: "https://images.pexels.com/photos/290518/pexels-photo-290518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
    ]
    return (
        <>
            <div className='pList w-full max-w-screen-lg mx-auto mt-12 sm:flex sm:flex-wrap sm:justify-between sm:gap-5'>
                {properties.map(property => (
                    <div key={property.propertyType} className="pListItem mb-5 flex-1 rounded-xl overflow-hidden cursor-pointer">
                        <Image
                            className='pListImg w-full h-40 object-cover'
                            src={property.img}
                            alt={`${property.propertyType} image`}
                            width={100}
                            height={100}
                        />
                        <div className="pListTitles">
                            <h1 className='text-xl font-bold'>{property.propertyType}</h1>
                            <h2 className='text-base font-light'>{property.propertyCount} Hotels</h2>
                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}

export default PropertyList