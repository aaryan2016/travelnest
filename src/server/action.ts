"use server"
import { db } from "./db";

export async function createUserAction(){
    const data = await db.user.create({
        data:{
            username: "User 1",
            email: "user1@example.com",
            password: "Mypassword1"
        }
    })
    console.log(data)
}

export async function createPropertyAction(){
    const data = await db.property.create({
        data:{
            title: "Hotel 1",
            description: "LSFnlDVJSVM:v;zdnkkz'dtnxcbxb;n",
            address: "street 1",
            city: "Surat",
            country: "India",
            propertyType: "HOTEL",
            createdBy: {
                connect:{
                    email : "user1@example.com"
                }
            }
        }
    })
    console.log(data)
}