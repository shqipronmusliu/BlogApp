import { NextApiRequest, NextApiResponse } from "next";
import { getBlog, updateBlog, deleteBlog } from "@/api/services/Blog";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const { id } = req.query as { id: string };

   if (req.method === "GET") {
      try {
      const blog = await getBlog(id);
      if (!blog) return res.status(404).json({ message: "Blog-i nuk u gjet" });
      return res.status(200).json(blog);
      } catch (error: any) {
      console.error("GET /api/blog/[id] error:", error);
      return res.status(500).json({ message: error.message });
      }
   }

   if (req.method === "PUT") {
      try {
      const updated = await updateBlog(id, req.body);
      if (!updated) return res.status(404).json({ message: "Blog-i nuk u gjet" });
      return res.status(200).json(updated);
      } catch (error: any) {
      console.error("PUT /api/blog/[id] error:", error);
      return res.status(500).json({ message: error.message });
      }
   }

   if (req.method === "DELETE") {
      try {
      await deleteBlog(id);
      return res.status(200).json({ message: "Blog u fshi me sukses" });
      } catch (error: any) {
      console.error("DELETE /api/blog/[id] error:", error);
      return res.status(500).json({ message: error.message });
      }
   }

  return res.status(405).json({ message: "Metoda e kërkesës nuk mbështetet" });
}