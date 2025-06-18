import { GetStaticPaths, GetStaticProps } from "next";
import { News } from "@/api/models/News";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  news: News;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/news`);
  const newsList: News[] = await res.json();

  const paths = newsList.map((n) => ({
    params: { id: n._id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/news/${params!.id}`);
  const news: News = await res.json();

  return {
    props: { news },
  };
};

export default function NewsSSG({ news }: Props) {
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
               ← Kthehu te news
            </Link>

            <p className="text-sm text-gray-400 mb-2">
               Renderuar me <strong>Static Site Generation</strong>
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 mb-4">
               {news.title}
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed mb-10">
               {news.body}
            </p>

            <p className="text-xs text-gray-400 italic mt-8">
               News ID: {news._id}
            </p>
         </motion.div>
      </>
   );
}
