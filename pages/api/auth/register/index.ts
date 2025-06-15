import { User } from '@/api/models/User';
import { getUserByEmail, createUser } from '@/api/services/User';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if (req.method === "GET") {
        return res.status(200).json({});
    }
    if(req.method == "POST"){
        const { name, email, password, role } = req.body as User;
        if(!name || !email || !password) {
            return res.status(400).json({ message: "Ju lutem plotesoni te gjitha fushat"});
        }
        try{
            const existingUser = await getUserByEmail(email);
            if(existingUser){
                return res.status(409).json({ message: "Ky email eshte i regjistruar"});
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                name,
                email,
                password: hashedPassword,
                role: role === "admin" ? "admin" : "user",
                createdAt: new Date(),
            };

            const result = await createUser(newUser);
            res.status(201).json({ 
                message: "Perdoruesi u regjistrua me sukses", 
                userId: result.insertedId,
            });
        }catch(error){
            res.status(500).json({ message: "Gabim gjate regjistrimit"});
        }
    }else{
        res.status(405).json({ message: "Metoda e kerkeses nuk eshte e mbeshtetur"});
    }
}