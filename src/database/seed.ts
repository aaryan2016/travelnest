// import { PropertyType, UserRole, BookingStatus, PaymentStatus } from "@prisma/client";
// import { db } from "../server/db";

// async function main() {
//   // Seed Users
//   const user1 = await db.user.upsert({
//     where: { email: "host1@example.com" },
//     update: {},
//     create: {
//       username: "host1",
//       email: "host1@example.com",
//       password: "hashed_password_1", // Replace with hashed password
//       role: UserRole.HOST,
//     },
//   });

//   const user2 = await db.user.upsert({
//     where: { email: "guest1@example.com" },
//     update: {},
//     create: {
//       username: "guest1",
//       email: "guest1@example.com",
//       password: "hashed_password_2", // Replace with hashed password
//       role: UserRole.GUEST,
//     },
//   });

//   // Seed Amenities
//   const wifiAmenity = await db.amenity.upsert({
//     where: { name: "WiFi" },
//     update: {},
//     create: {
//       name: "WiFi",
//       icon: "wifi_icon_url",
//     },
//   });

//   const parkingAmenity = await db.amenity.upsert({
//     where: { name: "Parking" },
//     update: {},
//     create: {
//       name: "Parking",
//       icon: "parking_icon_url",
//     },
//   });

//   // Seed Room Amenities
//   const tvAmenity = await db.roomAmenity.upsert({
//     where: { name: "TV" },
//     update: {},
//     create: {
//       name: "TV",
//       icon: "tv_icon_url",
//     },
//   });

//   const acAmenity = await db.roomAmenity.upsert({
//     where: { name: "AC" },
//     update: {},
//     create: {
//       name: "AC",
//       icon: "ac_icon_url",
//     },
//   });

//   // Seed Properties with multiple rooms
//   const property1 = await db.property.create({
//     data: {
//       title: "Luxury Apartment",
//       description: "A beautiful luxury apartment in the city center.",
//       propertyType: PropertyType.APARTMENT,
//       address: "123 Main Street",
//       city: "Metropolis",
//       country: "Fictionland",
//       images: ["image1_url", "image2_url"],
//       createdBy: { connect: { id: user1.id } },
//       ameneties: { connect: [{ id: wifiAmenity.id }, { id: parkingAmenity.id }] },
//       rooms: {
//         create: [
//           {
//             title: "Deluxe Room",
//             description: "A spacious room with a king-sized bed.",
//             price: 120.5,
//             capacity: 2,
//             quantity: 5,
//             images: ["room1_image1_url", "room1_image2_url"],
//             amenities: { connect: [{ id: tvAmenity.id }, { id: acAmenity.id }] },
//           },
//           {
//             title: "Standard Room",
//             description: "A cozy room with modern amenities.",
//             price: 80.0,
//             capacity: 2,
//             quantity: 10,
//             images: ["room2_image1_url", "room2_image2_url"],
//             amenities: { connect: [{ id: tvAmenity.id }] },
//           },
//         ],
//       },
//     },
//   });

//   const property2 = await db.property.create({
//     data: {
//       title: "Beachside Villa",
//       description: "A serene villa by the beach.",
//       propertyType: PropertyType.VILLA,
//       address: "456 Ocean Drive",
//       city: "Seaside",
//       country: "Fictionland",
//       images: ["image3_url", "image4_url"],
//       createdBy: { connect: { id: user1.id } },
//       ameneties: { connect: [{ id: wifiAmenity.id }] },
//       rooms: {
//         create: [
//           {
//             title: "Ocean View Room",
//             description: "Room with a stunning view of the ocean.",
//             price: 200.0,
//             capacity: 2,
//             quantity: 3,
//             images: ["room3_image1_url", "room3_image2_url"],
//             amenities: { connect: [{ id: tvAmenity.id }, { id: acAmenity.id }] },
//           },
//           {
//             title: "Garden View Room",
//             description: "Room with a peaceful garden view.",
//             price: 150.0,
//             capacity: 2,
//             quantity: 4,
//             images: ["room4_image1_url", "room4_image2_url"],
//             amenities: { connect: [{ id: tvAmenity.id }] },
//           },
//         ],
//       },
//     },
//   });

//   // Fetch the rooms after the properties are created
//   const property1Rooms = await db.room.findMany({
//     where: { propertyId: property1.id },
//   });
//   const property2Rooms = await db.room.findMany({
//     where: { propertyId: property2.id },
//   });

//   if (property1Rooms.length === 0 || property2Rooms.length === 0) {
//     throw new Error("No rooms found for one or more properties.");
//   }

//   // Seed Booking
//   await db.booking.create({
//     data: {
//       bookedByUser: { connect: { id: user2.id } },
//       roomsBooked: {
//       connect: [
//         { id: property1Rooms[0]?.id }, // Connect the first room of property1
//         { id: property2Rooms[0]?.id }, // Connect the first room of property2
//       ],
//     },
//       checkInDate: new Date("2024-01-15"),
//       checkOutDate: new Date("2024-01-20"),
//       noOfGuests: 2,
//       totalPrice: 602.5,
//       bookingStatus: BookingStatus.CONFIRMED,
//       paymrntStatus: PaymentStatus.PAID,
//     },
//   });

//   console.log("Seeding completed successfully!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
// //   .finally(async () => {
// //     await db.$disconnect();
// //   });

//V2
// import { PropertyType, UserRole, BookingStatus, PaymentStatus } from "@prisma/client";
// import { faker } from "@faker-js/faker";
// import { db } from "../server/db";


// async function main() {
//   // Seed Users
//   const users = await Promise.all(
//     Array.from({ length: 25 }).map(async (_, i) => {
//       return db.user.create({
//         data: {
//           username: faker.internet.username(),
//           email: faker.internet.email(),
//           password: faker.internet.password({length: 10}), // Replace with hashed password in real usage
//           role: i === 0 ? UserRole.HOST : UserRole.GUEST, // First user is the HOST
//         },
//       });
//     })
//   );

//   // Seed Amenities
//   const amenities = await Promise.all(
//     ["Gyser", "Gym", "Air Conditioning", "Spa", "Food-Court"].map(async (name) => {
//       return db.amenity.create({
//         data: {
//           name,
//           icon: faker.image.url(), // Generate random icon URLs
//         },
//       });
//     })
//   );

//   // Seed Room Amenities
//   const roomAmenities = await Promise.all(
//     ["Mini Fridge", "Hair Dryer", "Coffee Machine", "Food-Service", "Personal Computer"].map(async (name) => {
//       return db.roomAmenity.create({
//         data: {
//           name,
//           icon: faker.image.url(), // Generate random icon URLs
//         },
//       });
//     })
//   );

//   // Seed Properties and Rooms
//   const properties = await Promise.all(
//     Array.from({ length: 200 }).map(async (_, i) => {
//       const property = await db.property.create({
//         data: {
//           title: faker.company.name(),
//           description: faker.lorem.paragraph(),
//           propertyType: faker.helpers.arrayElement(Object.values(PropertyType)),
//           address: faker.location.streetAddress(),
//           city: faker.location.city(),
//           country: faker.location.country(),
//           images: Array.from({ length: 3 }).map(() => faker.image.url()),
//           createdBy: { connect: { id: users[0]?.id } }, // Connect to the first user (Host)
//           ameneties: { connect: amenities.map((amenity) => ({ id: amenity.id })) },
//           rooms: {
//             create: Array.from({ length: 5 }).map(() => ({
//               title: faker.commerce.productName(),
//               description: faker.lorem.sentence(),
//               price: faker.number.float({ min: 50, max: 500}),
//               capacity: faker.number.int({ min: 1, max: 6 }),
//               quantity: faker.number.int({ min: 1, max: 20 }),
//               images: Array.from({ length: 6 }).map(() => faker.image.url()),
//               amenities: { connect: roomAmenities.map((amenity) => ({ id: amenity.id })) },
//             })),
//           },
//         },
//         include: {
//           rooms: true, // Include rooms to use their IDs later for bookings
//         },
//       });

//       return property;
//     })
//   );

//   // Seed Bookings
//   await Promise.all(
//     Array.from({ length: 300 }).map(async () => {
//       const randomProperty = faker.helpers.arrayElement(properties);
//       const randomRoom = faker.helpers.arrayElement(randomProperty.rooms);

//       await db.booking.create({
//         data: {
//           bookedByUser: { connect: { id: faker.helpers.arrayElement(users).id } },
//           roomsBooked: { connect: [{ id: randomRoom.id }] },
//           checkInDate: faker.date.future(),
//           checkOutDate: faker.date.future(),
//           noOfGuests: faker.number.int({ min: 1, max: 4 }),
//           totalPrice: faker.number.float({ min: 100, max: 1000 }),
//           bookingStatus: faker.helpers.arrayElement(Object.values(BookingStatus)),
//           paymrntStatus: faker.helpers.arrayElement(Object.values(PaymentStatus)),
//         },
//       });
//     })
//   );

//   console.log("Seeding completed successfully!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   // .finally(async () => {
//   //   await db.$disconnect();
//   // });

//V3
import { PropertyType, UserRole, BookingStatus, PaymentStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { db } from "../server/db";

// City-country pairings
const cityCountryMap = [
  { city: "New York", country: "USA" },
  { city: "Los Angeles", country: "USA" },
  { city: "Paris", country: "France" },
  { city: "Tokyo", country: "Japan" },
  { city: "London", country: "UK" },
  { city: "Metropolis", country: "Fictionland" },
  { city: "Seaside", country: "Fictionland" },
  { city: "Berlin", country: "Germany" },
  { city: "Rome", country: "Italy" },
  { city: "Barcelona", country: "Spain" },
  {city: "Surat", country: "India"},
  {city: "Ahmedabad", country: "India"},
  {city: "Pune", country: "India"},
  {city: "Mumbai", country: "India"},
  {city: "Vadodara", country: "India"},
  {city: "Bhopal", country: "India"},
  {city: "Salem", country: "India"},
  {city: "Jaipur", country: "India"},
  {city: "Chandigarh", country: "India"},
  {city: "Delhi", country: "India"},
  {city: "Hyderabad", country: "India"},
]

async function main() {
  // Seed Users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) => {
      return db.user.create({
        data: {
          username: faker.internet.username(),
          email: faker.internet.email(),
          password: faker.internet.password({ length: 10 }), // Replace with hashed password in real usage
          role: i === 0 ? UserRole.ADMIN : UserRole.GUEST, // First user is the ADMIN
        },
      });
    })
  );

  // Seed Amenities
  const amenities = await Promise.all(
    ["Gyser", "Gym", "Air Conditioning", "Spa", "Food-Court", "Free-Taxi"].map(async (name) => {
      return db.amenity.create({
        data: {
          name,
          icon: faker.image.url(), // Generate random icon URLs
        },
      });
    })
  );

  // Seed Room Amenities
  const roomAmenities = await Promise.all(
    ["Mini Fridge", "Hair Dryer", "Coffee Machine", "Food-Service", "Personal Computer"].map(async (name) => {
      return db.roomAmenity.create({
        data: {
          name,
          icon: faker.image.url(), // Generate random icon URLs
        },
      });
    })
  );

  // Seed Properties and Rooms with minimum 5 properties per city
  const properties = await Promise.all(
    cityCountryMap.map(async ({ city, country }) => {
      // Ensure at least 5 properties in the city
      const minProperties = 5;

      const cityProperties = await Promise.all(
        Array.from({ length: minProperties }).map(async () => {
          const property = await db.property.create({
            data: {
              title: faker.company.name(),
              description: faker.lorem.paragraph(),
              propertyType: faker.helpers.arrayElement(Object.values(PropertyType)),
              address: faker.location.streetAddress(),
              city: city,
              country: country,
              images: Array.from({ length: 3 }).map(() => faker.image.url()),
              createdBy: { connect: { id: users[0]?.id } }, // Connect to the first user (Host)
              ameneties: { connect: amenities.map((amenity) => ({ id: amenity.id })) },
              rooms: {
                create: Array.from({ length: 5 }).map(() => ({
                  title: faker.commerce.productName(),
                  description: faker.lorem.sentence(),
                  price: faker.number.float({ min: 50, max: 500 }),
                  capacity: faker.number.int({ min: 1, max: 6 }),
                  quantity: faker.number.int({ min: 1, max: 10 }),
                  images: Array.from({ length: 6 }).map(() => faker.image.url()),
                  amenities: { connect: roomAmenities.map((amenity) => ({ id: amenity.id })) },
                })),
              },
            },
            include: {
              rooms: true, // Include rooms to use their IDs later for bookings
            },
          });
          return property;
        })
      );

      // Optionally, create more properties for the city
      // const additionalProperties = await Promise.all(
      //   Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(async () => {
      //     const property = await db.property.create({
      //       data: {
      //         title: faker.company.name(),
      //         description: faker.lorem.paragraph(),
      //         propertyType: faker.helpers.arrayElement(Object.values(PropertyType)),
      //         address: faker.location.streetAddress(),
      //         city: city,  // Ensure the same city
      //         country: country,  // Ensure the same country
      //         images: Array.from({ length: 3 }).map(() => faker.image.url()),
      //         createdBy: { connect: { id: users[0]?.id } }, // Connect to the first user (Host)
      //         ameneties: { connect: amenities.map((amenity) => ({ id: amenity.id })) },
      //         rooms: {
      //           create: Array.from({ length: 5 }).map(() => ({
      //             title: faker.commerce.productName(),
      //             description: faker.lorem.sentence(),
      //             price: faker.number.float({ min: 50, max: 500 }),
      //             capacity: faker.number.int({ min: 1, max: 6 }),
      //             quantity: faker.number.int({ min: 1, max: 10 }),
      //             images: Array.from({ length: 6 }).map(() => faker.image.url()),
      //             amenities: { connect: roomAmenities.map((amenity) => ({ id: amenity.id })) },
      //           })),
      //         },
      //       },
      //       include: {
      //         rooms: true, // Include rooms to use their IDs later for bookings
      //       },
      //     });
      //     return property;
      //   })
      // );

      // Combine the properties to have at least 5 properties for the city
      // return [...cityProperties, ...additionalProperties];
      return [...cityProperties];
    })
  );

  // Seed Bookings
  await Promise.all(
    Array.from({ length: 50 }).map(async () => {
      const randomProperty = faker.helpers.arrayElement(properties.flat());
      const randomRoom = faker.helpers.arrayElement(randomProperty.rooms);

      await db.booking.create({
        data: {
          bookedByUser: { connect: { id: faker.helpers.arrayElement(users).id } },
          roomsBooked: { connect: [{ id: randomRoom.id }] },
          checkInDate: faker.date.future(),
          checkOutDate: faker.date.future(),
          noOfGuests: faker.number.int({ min: 1, max: 4 }),
          totalPrice: faker.number.float({ min: 100, max: 1000 }),
          bookingStatus: faker.helpers.arrayElement(Object.values(BookingStatus)),
          paymrntStatus: faker.helpers.arrayElement(Object.values(PaymentStatus)),
        },
      });
    })
  );

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // .finally(async () => {
  //   await db.$disconnect();
  // });
