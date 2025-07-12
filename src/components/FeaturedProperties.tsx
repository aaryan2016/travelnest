import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

interface featuredHotel {
    hotelName: string,
    img: string
    city: string,
    startingPrice: number,
    rating: number
}

function FeaturedProperties() {
    const featuredHotels: featuredHotel[] = [
        {
            hotelName: "Hotel Stare Miasto",
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c4/4e/66/aparthotel-stare-miasto.jpg?w=800&h=-1&s=1",
            city: "Madrid",
            startingPrice: 100,
            rating: 8.7
        },
        {
            hotelName: "Hotel Stare Miasto 2",
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c4/4e/66/aparthotel-stare-miasto.jpg?w=800&h=-1&s=1",
            city: "Madrid",
            startingPrice: 220,
            rating: 8.9
        },
        {
            hotelName: "Hotel Stare Miasto 3",
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c4/4e/66/aparthotel-stare-miasto.jpg?w=800&h=-1&s=1",
            city: "Madrid",
            startingPrice: 300,
            rating: 9.1
        },
        {
            hotelName: "Hotel Stare Miasto 4",
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c4/4e/66/aparthotel-stare-miasto.jpg?w=800&h=-1&s=1",
            city: "Madrid",
            startingPrice: 320,
            rating: 8.8
        },
    ]
    return (
        <div className="fp w-full max-w-screen-lg mx-auto mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {featuredHotels.map(fh => (
                    <div key={fh.hotelName} className="fpItem flex flex-col gap-3 p-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <div className="w-full relative h-52">
                            <Image
                                src={fh.img}
                                alt={fh.hotelName}
                                layout="fill"
                                objectFit="cover"
                                className="fpImg w-full rounded-xl"
                            />
                        </div>
                        <span className="fpName font-bold text-lg">{fh.hotelName}</span>
                        <span className="fpCity font-light text-md">{fh.city}</span>
                        <span className="fpPrice font-medium text-base">Starting From ${fh.startingPrice}</span>
                        <div className="fpRating flex items-center">
                            <Button className="text-white font-bold bg-blue-900 px-3 py-1 rounded-lg mr-3">
                                {fh.rating}
                            </Button>
                            <span className="text-base">Excellent</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeaturedProperties