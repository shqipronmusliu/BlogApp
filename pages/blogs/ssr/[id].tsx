import { GetServerSideProps } from "next";
import { Blog } from "@/api/models/Blog";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  blog: Blog;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blogs/${params?.id}`);
  if (!res.ok) return { notFound: true };

  const blog: Blog = await res.json();

  return {
    props: { blog },
  };
};

export default function SSRBlogDetail({ blog }: Props) {
   return (
      <>
         <Head>
            <title>{blog.title} | BlogIn</title>
         </Head>

         <motion.div
            className="pt-28 px-6 max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
         >
            <Link href="/blogs" className="text-sm text-blue-600 hover:underline block mb-8">
            ← Kthehu te Blogjet
            </Link>

            <p className="text-sm text-gray-400 mb-2">
            Renderuar me <strong>Server-Side Rendering (SSR)</strong>
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 mb-4">
            {blog.title}
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed mb-10">
            {blog.body}
            </p>

            <p className="text-xs text-gray-400 italic mt-8">
            Blog ID: {blog._id}
            </p>
         </motion.div>
      </>
   );
}
