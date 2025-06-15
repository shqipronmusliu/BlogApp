import { NextApiRequest, NextApiResponse } from "next";
import { createBlog, getBlogs } from "@/api/services/Blog";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const blogs = await getBlogs();
      return res.status(200).json(blogs);
    } catch (error: any) {
      console.error("GET /api/blogs error:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const newBlog = req.body;
      const result  = await createBlog(newBlog);
      return res.status(201).json(result);
    } catch (error: any) {
      console.error("POST /api/blogs error:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Metoda e kërkesës nuk mbështetet" });
}
