import React from 'react'

const footerLinks = [
    "Countries",
    "Regions",
    "Cities",
    "Districts",
    "Airports",
    "Hotels",
];

function Footer() {
    return (
        <div className='navbar flex justify-center bg-gray-100'>
            <footer className='footer flex flex-col w-full max-w-screen-lg justify-between px-8 m-4'>
                {/* <div className="fLists w-full flex justify-between mb-12">
                <ul className="fList">
                    <li className="fListItem mb-[10] text-blue-900">Countries</li>
                    <li className="fListItem mb-[10] text-blue-900">Regions</li>
                    <li className="fListItem mb-[10] text-blue-900">Cities</li>
                    <li className="fListItem mb-[10] text-blue-900">Districts</li>
                    <li className="fListItem mb-[10] text-blue-900">Airports</li>
                    <li className="fListItem mb-[10] text-blue-900">Hotels</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem mb-[10] text-blue-900">Countries</li>
                    <li className="fListItem mb-[10] text-blue-900">Regions</li>
                    <li className="fListItem mb-[10] text-blue-900">Cities</li>
                    <li className="fListItem mb-[10] text-blue-900">Districts</li>
                    <li className="fListItem mb-[10] text-blue-900">Airports</li>
                    <li className="fListItem mb-[10] text-blue-900">Hotels</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem mb-[10] text-blue-900">Countries</li>
                    <li className="fListItem mb-[10] text-blue-900">Regions</li>
                    <li className="fListItem mb-[10] text-blue-900">Cities</li>
                    <li className="fListItem mb-[10] text-blue-900">Districts</li>
                    <li className="fListItem mb-[10] text-blue-900">Airports</li>
                    <li className="fListItem mb-[10] text-blue-900">Hotels</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem mb-[10] text-blue-900">Countries</li>
                    <li className="fListItem mb-[10] text-blue-900">Regions</li>
                    <li className="fListItem mb-[10] text-blue-900">Cities</li>
                    <li className="fListItem mb-[10] text-blue-900">Districts</li>
                    <li className="fListItem mb-[10] text-blue-900">Airports</li>
                    <li className="fListItem mb-[10] text-blue-900">Hotels</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem mb-[10] text-blue-900">Countries</li>
                    <li className="fListItem mb-[10] text-blue-900">Regions</li>
                    <li className="fListItem mb-[10] text-blue-900">Cities</li>
                    <li className="fListItem mb-[10] text-blue-900">Districts</li>
                    <li className="fListItem mb-[10] text-blue-900">Airports</li>
                    <li className="fListItem mb-[10] text-blue-900">Hotels</li>
                </ul>
            </div> */}
                <div className="fLists flex flex-wrap justify-center sm:justify-between gap-6 mb-12">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <ul key={index} className="fList space-y-2 text-blue-900 min-w-[120px]">
                            {footerLinks.map((link, i) => (
                                <li key={i} className="fListItem hover:underline cursor-pointer">
                                    {link}
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
                <div className="fText text-center">Made by Rahul Vaiwala</div>
            </footer>
        </div>
    )
}

export default Footer