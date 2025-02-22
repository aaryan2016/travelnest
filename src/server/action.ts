"use server"
import { db } from "./db";

// https://chatgpt.com/share/6741ff76-accc-8002-9d30-0e1ee71902a9

// export async function createAllAction() {
// 	const data = await db.user.create({
// 		data: {
// 			username: "Test user name",
// 			email: "test@test.com",
// 			password: "test123",
// 			properties: {
// 				create: {
// 					title: "Property 1",
// 					description:
// 						"dfsadj;askvbkvbasd;jsdja;fja;dsdlfknasd;vjsad;vnas;djnsadnsd;js;dlj;lf",
// 					address: "street 1",
// 					city: "Surat",
// 					country: "India",
// 					propertyType: "HOTEL",
// 					ameneties: {
// 						create: {
// 							name: "sdnasldna",
// 						},
// 					},
// 					images: ["sdsdcsdcsdvfnlsjv;sdnva;l", "sdnsdlcnsdln;"],
// 					rooms: {
// 						create: {
// 							title: "Room 1",
// 							description:
// 								"lksad;lfjasldfkjasl;jvnd;jvnwoivasl;dvsl;dns;ldnvs;lvn;lnvsd",
// 							price: 543.16,
// 							capacity: 10,
// 							quantity: 12,
// 							images: ["lasdnalsdnalnfal", "dasodjasdja;"],
// 							amenities: {
// 								create: { name: "dndlnalnalc" },
// 							},
// 						},
// 					},
// 				},
// 			},
// 		},
// 	});
// }

export async function createAllAction() {
    await db.user.create({
        data: {
            username: 'Third User Name',
            email: 'thirduser@example.com',
            password: 'password789',
            properties: {
                create: {
                    title: 'Third Property Title',
                    description: "Third property description goes here.",
                    address: "Third Street Address",
                    city: "Bangalore",
                    country: "India",
                    propertyType: "RESORT",
                    ameneties: {
                        create: {
                            name: 'Third Amenity Name',
                        }
                    },
                    images: ['thirdimage1url.com', 'thirdimage2url.com'],
                    rooms: {
                        create: {
                            title: 'Third Room Title',
                            description: 'Description for the third room with its features.',
                            price: 1200.75,
                            capacity: 12,
                            quantity: 20,
                            images: ['thirdroomimage1.com', 'thirdroomimage2.com'],
                            amenities: {
                                create: { name: 'Third Room Amenity Name' }
                            },
                        }
                    }
                }
            },
        }
    });
}



// export async function createUserAction(){
//     const data = await db.user.create({
//         data:{
//             username: "host_user",
//             email: "host_user@example.com",
//             password: "hashed_password_456",
//             role: "HOST",
//         }
//     })
//     console.log(data)
// }

// export async function createPropertyAction(){
//     const data = await db.property.create({
//         data:{
//             title: "Cozy Beachfront Villa",
//             description: "A beautiful villa located right on the beach with stunning sea views.",
//             address: "456 Ocean Drive",
//             city: "Miami",
//             country: "USA",
//             propertyType: "VILLA",
//             createdBy: {
//                 connect:{
//                     email : "host_user@example.com"
//                 }
//             }
//         }
//     })
//     console.log(data)
// }