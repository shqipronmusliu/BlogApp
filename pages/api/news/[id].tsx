import { NextApiRequest, NextApiResponse } from "next";
import { deleteNews, getSingleNews, updateNews } from "@/api/services/News";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === "GET"){
        try{
            const { id } = req.query;

            const news = await getSingleNews(id as string);

            res.status(200).json(news);
        }catch (error) {
            res.status(500).json({ message: "Gabim gjate marrjes se news" });
        }
    }
    if(req.method === "PUT"){
        try{
            const { id } = req.query;
            const data = req.body;

            const news = await updateNews(id as string, data);

            res.status(200).json(news);
        }catch (error) {
            res.status(500).json({ message: "Gabim gjate perditesimit te news" });
        }
    }
    if(req.method === "DELETE"){
        try{
            const { id } = req.query;

            const news = await deleteNews(id as string);

            res.status(200).json(news);
        }catch (error) {
            res.status(500).json({ message: "Gabim gjate fshirjes se news" });
        }
    }else{
        res.status(405)
        .json({ message: "Metoda e kerkeses nuk eshte e mbeshtetur" });
    }
}