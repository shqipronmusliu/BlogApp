import { createUser, getAllUsers } from "@/api/services/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === "POST") {
      try {
      const newUser = await createUser(req.body);
      return res.status(201).json(newUser);
      } catch (err: any) {
      return res.status(500).json({ message: err.message });
      }
   }
   if (req.method === "GET") {
      const users = await getAllUsers();
      return res.status(200).json(users);
   }
   res.setHeader("Allow", ["GET", "POST"]);
   res.status(405).end(`Method ${req.method} Not Allowed`);
}
