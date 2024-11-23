"use server"
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import {z} from 'zod';
import { genSaltSync, hashSync } from "bcrypt-ts";

const prisma = new PrismaClient();

const userSchema = z.object({
    username: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST'){
        try{
            const validatedData = userSchema.parse(req.body);

            const { email, username, password } = validatedData;
            
            const salt = genSaltSync(10);
            const hash = hashSync(password, salt);

            const user = await prisma.user.create({
                data:{
                    email,
                    username,
                    password: hash,
                }
            });

            return res.status(201).json(user)
        }
        catch(error){
            if (error instanceof z.ZodError) {
                return res.status(400).json({ error: error.errors });
            }
            return res.status(500).json({ error: 'Failed to create user' });
        }
    }
    else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}