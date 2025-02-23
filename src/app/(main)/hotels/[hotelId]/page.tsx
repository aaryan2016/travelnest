import { fetchPropertyData } from '@/app/actions'
import Footer from '@/components/Footer'
import HotelRoomWrapper from '@/components/HotelRoomWrapper'
import MailList from '@/components/MailList'
import { Button } from '@/components/ui/button'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Image from 'next/image'

export interface propertyAmenities {
    id: string,
    createdAt: Date,
    name: string,
    icon: string | null,
}

export interface propertyData {
    id: string,
    title: string,
    description: string,
    address: string,
    city: string,
    ameneties: propertyAmenities[],
    rooms: propertyRooms[]
}

export interface propertyRooms {
    id: string,
    title: string,
    description: string,
    price: number,
    capacity: number,
    quantity: number,
    amenities: {
        id: string,
        name: string,
        icon: string | null,
    }[]
}

export interface HotelPageSearchParams {
    hotelId: string;
    // from: string;
    // to: string;
}

export default async function page({ params, searchParams }: { params: Promise<HotelPageSearchParams>, searchParams: { from: string; to: string; } }) {
    const photos = [
        {
            id: 1,
            src: "https://img.freepik.com/free-photo/luxury-bedroom-hotel_1150-10836.jpg?t=st=1735388964~exp=1735392564~hmac=246dfe6744be440d4dad32a5132e46d99b0a8014539e364821f23cb68f829dd7&w=996"
        },
        {
            id: 2,
            src: "https://img.freepik.com/free-photo/modern-studio-apartment-design-with-bedroom-living-space_1262-12375.jpg?t=st=1735388964~exp=1735392564~hmac=735508d930d56a0ea0aa12bfd4350045f6189809708744d8abd74893107e140a&w=996"
        },
        {
            id: 3,
            src: "https://img.freepik.com/free-photo/hotel-room-interior-with-bedroom-area-living-space-kitchen_1262-12288.jpg?t=st=1735388964~exp=1735392564~hmac=d86dd771582e2f89b4176339ee88e0fccc12d80091f26bd386c30a100684c504&w=996"
        },
        {
            id: 4,
            src: "https://img.freepik.com/free-photo/3d-rendering-modern-luxury-bedroom-suite-bathroom_105762-1936.jpg?t=st=1735388965~exp=1735392565~hmac=eed438345ea05d85dd9058b4166671b38bbe5d5f4adaa67c0f2895338eb17535&w=826"
        },
        {
            id: 5,
            src: "https://img.freepik.com/free-photo/cozy-studio-apartment-with-bedroom-living-space_1262-12323.jpg?t=st=1735388965~exp=1735392565~hmac=d7ba23fd42836059c7a7f34ca04b4c97eb9dcaf78e8a167ab0c18f7abae59b65&w=996"
        },
        {
            id: 6,
            src: "https://img.freepik.com/free-photo/3d-rendering-luxury-bedroom-suite-resort-hotel-with-twin-bed-living_105762-2018.jpg?t=st=1735388965~exp=1735392565~hmac=f5afd7adf63bf58606eec09075299a7f01f6239eda67b7c8f69524555a6eb7e6&w=996"
        }
    ]
    try {
        const hotelId: string = (await params).hotelId;
        const { from, to } = searchParams

        const propertyData: propertyData | null = await fetchPropertyData({ id: hotelId })
        const propertyAmenities: propertyAmenities[] | undefined = propertyData?.ameneties;
        const propertyRooms: propertyRooms[] | undefined = propertyData?.rooms;
        return (
            <div>
                {/* <Navbar /> */}
                <div className="hotelContainer flex flex-col items-center mt-5">
                    <div className="hotelWrapper w-full max-w-screen-lg flex flex-col gap-3 relative">
                        <Button className='bookNow absolute top-3 right-0'>Reserve or Book Now!</Button>
                        <h1 className="hotelTitle font-bold text-2xl">{propertyData?.title}</h1>
                        <div className="hotelAddress text-xs flex items-center gap-3">
                            <FontAwesomeIcon icon={faLocationDot} className='h-4' />
                            <span>{propertyData?.address}</span>
                        </div>
                        <span className="hotelDistance text-[#0071c2] font-medium">
                            Excellent Location - 500m from center
                        </span>
                        <span className="hotelPriceHighlight text-[#008009] font-medium">
                            Book a stay over $114 at this property and get a free airport taxi
                        </span>
                        <div className="hotelImages flex flex-wrap justify-between">
                            {photos.map((photo) => (
                                <div className="hotelImgWrapper w-1/3 p-1" key={photo.id}>
                                    <Image
                                        src={photo.src}
                                        alt=""
                                        width={400}
                                        height={240}
                                        className="hotelImg w-full object-cover h-60 m-[2px] rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="hotelDetails flex justify-between gap-5 mt-5">
                            <div className="hotelDetailsText flex-[3_3_0%]">
                                <h1 className='hotelTitle font-bold text-2xl'>Stay in the heart of {propertyData?.city}</h1>
                                <p className="hotelDesc text-sm mt-5">
                                    {propertyData?.description}
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et saepe modi earum aperiam maiores. Ipsam, labore facere ea consequatur dolores voluptatibus rerum laudantium suscipit similique ullam inventore nisi quam ipsum.
                                    Ipsam, praesentium ut. Repellat illum doloremque voluptatibus sapiente dolores accusamus possimus, inventore ducimus quidem debitis maxime quasi eius dolore ratione tenetur molestias, obcaecati optio sunt incidunt dicta. Laborum, asperiores suscipit?
                                </p>
                            </div>
                            <div className="hotelDetailsPrice flex-1 bg-blue-100 p-5 flex flex-col gap-5 rounded">
                                <h1 className='font-bold text-lg text-[#555]'>Perfect for a 9-night stay!</h1>
                                <span className='text-sm'>
                                    Located in the real heart of {propertyData?.city}, this property has an excellent location score of 9.8!
                                </span>
                                <h2 className='font-light text-xl'>
                                    <b className='font-bold'>$945</b> (9 nights)
                                </h2>
                                <Button>Reserve or Book Now!</Button>
                            </div>
                        </div>
                        <div className='facilities mt-3'>
                            <h1 className="facilityTitle font-bold text-lg">Most popular facilities</h1>
                            <div className="facilityName flex mt-6">
                                {propertyAmenities?.map(amenity => (
                                    <div key={amenity.id} className='flex font-semibold items-center mr-9'>
                                        {amenity.icon && (
                                            <Image
                                                src={amenity.icon}
                                                alt={amenity.name}
                                                width={32}
                                                height={32}
                                                className="h-8 mr-1"
                                            />
                                        )}
                                        <div>{amenity.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div className='availibility mt-9'>
                            <h1 className="availibilityTitle font-bold text-lg">Availability</h1>
                            {propertyRooms?.length ? (
                                propertyRooms.map(room => (
                                    <div key={room.id}>
                                        <HotelRoom props={room} />
                                    </div>
                                ))
                            ) : (
                                <p>No available rooms.</p> // Handle case with no rooms available
                            )}
                        </div> */}
                        {/* <HotelRoomWrapper propertyName={propertyData?.title} propertyRooms={propertyRooms} from="2025-02-10" to="2025-02-20" /> Example dates */}
                        <HotelRoomWrapper propertyName={propertyData?.title} propertyRooms={propertyRooms} from={from} to={to} /> {/* Example dates */}
                    </div>
                    <MailList />
                    <Footer />
                </div>
            </div >
        )
    } catch (error) {
        console.error(error)
        return <div>Error fetching property data.</div>
    }
}