import { NextApiRequest, NextApiResponse } from "next";
import { createBlog, getBlogs } from "@/api/services/Blog";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const blogs = await getBlogs();
      return res.status(200).json(blogs);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "POST") {
  const token = await getToken({ req });


  if (!token) return res.status(401).json({ message: "Nuk je i kyçur." });

  if (token.role !== "user") {
    return res.status(403).json({ message: "Nuk ke të drejtë me kriju blog." });
  }

  try {
    const data = {
      title: req.body.title,
      body: req.body.body,
      userEmail: token.email,
      userId: token.id,
      createdAt: new Date(),
    };
    const result = await createBlog(data);
    return res.status(201).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Metoda nuk mbështetet" });
}
