import { GetServerSideProps } from "next";
import { News } from "@/api/models/News";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import React from "react";

type Props = {
  news: News;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const client = await clientPromise;
  const db = client.db("blog-app");

  const news = await db.collection("news").findOne({
    _id: new ObjectId(params!.id as string),
  });

  if (!news) return { notFound: true };

  return {
    props: {
      news: JSON.parse(JSON.stringify(news)),
    },
  };
};

export default function SSRNewsDetail({ news }: Props) {
  return (
      <>
         <Head>
            <title>{news.title} | News</title>
         </Head>

         <motion.div
            className="pt-28 px-6 max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
         >
            <Link href="/news" className="text-sm text-blue-600 hover:underline block mb-8">
            ← Kthehu te News
            </Link>

            <p className="text-sm text-gray-400 mb-2">
            Renderuar me <strong>Server-Side Rendering (SSR)</strong>
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 mb-4">
            {news.title}
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed mb-10">
            {news.body}
            </p>

            <p className="text-xs text-gray-400 italic mt-8">
               News ID: {news._id?.toString()}
            </p>
         </motion.div>
      </>
   );
}
