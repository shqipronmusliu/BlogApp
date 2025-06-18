import { createNews, getNews } from "@/api/services/News";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const newNews = req.body;
            const result = await createNews(newNews);
            return res.status(201).json(result);
        } catch  {
            return res.status(500).json({ message: "Gabim gjate krijimit te news" });
        }
    } else if (req.method === "GET") {
        try {
            const news = await getNews();
            return res.status(200).json(news);
        } catch {
            return res.status(500).json({ message: "Gabim gjate marrjes se news" });
        }
    } else {
        return res.status(405).json({ message: "Metoda e kerkeses nuk eshte e mbeshtetur" });
    }
}
 