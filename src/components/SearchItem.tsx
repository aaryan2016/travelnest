import React from 'react'
import { Button } from './ui/button'
import type { propertiesData } from '@/app/hotels/page'
import Link from 'next/link'

function SearchItem({ id, title, propertyType, rooms }: propertiesData) {
    const lowestPrice = Math.min(...rooms.map(room => room.price));
    return (
        <div className='searchItem border-[1px] border-solid border-gray-300 p-3 rounded flex justify-between gap-5 mb-5'>
            <img
                className='siImg w-52 h-52 object-cover'
                src="https://cms.interiorcompany.com/wp-content/uploads/2024/01/creating-distinct-zones-with-flooring-studio-apartment-design.jpg"
                alt="studio_apartment"
            />
            <div className="siDesc flex flex-col gap-2 flex-[2_2_0%]">
                <Link href={`/hotels/${id}`}>
                    <h1 className="siTitle text-xl font-extrabold text-blue-800">{title}</h1>
                </Link>
                <span className="siDistance text-xs">500m from center</span>
                <span className="siTaxiOp text-xs  bg-green-700 text-white w-max p-1 rounded">Free airport Taxi</span>
                <span className="siSubtitle text-xs font-bold">Studio {propertyType} with Air Conditioning</span>
                <span className="siFeatures text-xs">Entire Studio * 1 Bathroom * 1 Full Bed</span>
                <span className="siCancelOp text-xs text-green-800 font-bold">Free Cancellation</span>
                <span className="siCancelOpSubtitle text-xs text-green-800">You can cancel later, so lock in this great price today!</span>
            </div>
            <div className="siDetails flex-1 flex flex-col justify-between">
                <div className="siRating flex justify-between">
                    <span className='font-medium'>Excellent</span>
                    <button className='bg-[#003580] text-white p-1 font-bold border-none' type='button'>8.9</button>
                </div>
                <div className="siDetailsTexts text-right flex flex-col gap-1">
                    <span className="siPrice text-2xl">${lowestPrice.toFixed(0)}</span>
                    <span className="siTaxOp text-xs text-gray-500">Includes taxes and fees</span>
                    <Button
                        className='siCheckButton font-semibold'>
                        See Availibility
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SearchItem