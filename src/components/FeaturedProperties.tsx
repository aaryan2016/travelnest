import React from 'react'
import { Button } from './ui/button'

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
            hotelName: "ApartHotel Stare Miasto",
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c4/4e/66/aparthotel-stare-miasto.jpg?w=800&h=-1&s=1",
            city: "Madrid",
            startingPrice: 120,
            rating: 8.9
        },
        {
            hotelName: "ApartHotel Stare Miasto 2",
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c4/4e/66/aparthotel-stare-miasto.jpg?w=800&h=-1&s=1",
            city: "Madrid",
            startingPrice: 120,
            rating: 8.9
        },
        {
            hotelName: "ApartHotel Stare Miasto 3",
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c4/4e/66/aparthotel-stare-miasto.jpg?w=800&h=-1&s=1",
            city: "Madrid",
            startingPrice: 120,
            rating: 8.9
        },
        {
            hotelName: "ApartHotel Stare Miasto 4",
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c4/4e/66/aparthotel-stare-miasto.jpg?w=800&h=-1&s=1",
            city: "Madrid",
            startingPrice: 120,
            rating: 8.9
        },
    ]
    return (
        <div className='fp w-full max-w-screen-lg flex justify-between gap-5'>
            {featuredHotels.map(fh => (
                <div key={fh.hotelName} className="fpItem flex-1 flex flex-col gap-[10]">
                    <img
                        src={fh.img}
                        alt=""
                        className="fpImg w-full rounded-xl"
                    />
                    <span className="fpName font-bold">{fh.hotelName}</span>
                    <span className="fpCity font-light">{fh.city}</span>
                    <span className="fpPrice font-medium">Starting From ${fh.startingPrice}</span>
                    <div className="fpRating">
                        <Button className='text-white font-bold bg-blue-900 px-2 py-[2] border-none mr-3'>{fh.rating}</Button>
                        <span className='text-base'>Excellent</span>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default FeaturedProperties