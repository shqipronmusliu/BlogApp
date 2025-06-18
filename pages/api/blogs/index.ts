import { NextApiRequest, NextApiResponse } from "next";
import { createBlog, getBlogs } from "@/api/services/Blog";
import { getToken } from "next-auth/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const blogs = await getBlogs();
      return res.status(200).json(blogs);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Gabim i panjohur" });
    }
  }

  if (req.method === "POST") {
    const token = await getToken({ req });


    if (!token || !token.email || !token.id) {
    return res.status(401).json({ message: "Nuk je i kyçur ose mungon email/ID." });
    }

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Gabim i panjohur" });
    }
  }

  return res.status(405).json({ message: "Metoda nuk mbështetet" });
}
