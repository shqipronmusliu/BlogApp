import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";  
import { getUserById, updateUser, deleteUser } from "@/api/services/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Jo i autorizuar" });

  const { id } = req.query as { id: string };

  if (req.method === "GET") {
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: "User-i nuk u gjet" });
    return res.status(200).json(user);
  }

  if (req.method === "PUT") {
    const updated = await updateUser(id, req.body);
    if (!updated) return res.status(404).json({ message: "User-i nuk u gjet" });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    try {
      await deleteUser(id as string);
      return res.status(200).json({ message: "Përdoruesi u fshi me sukses" });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  return res.status(405).json({ message: "Metoda nuk mbështetet" });
}
