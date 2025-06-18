import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Edit, Trash, View } from "lucide-react";
import { useSession } from "next-auth/react";
import React from 'react';

type News = {
  _id: string;
  title: string;
  body: string;
  userEmail?: string;
};

export default function NewsPage() {
    const { data: newsData, loading, remove } = useFetch<News[]>("/api/news");
    const { data: session, status } = useSession();
    const [items, setItems] = useState<News[] | null>(null);
    const isAdmin = session?.user?.role === "admin";
    const isUser = session?.user?.role === "user";
    const isLoadingSession = status === "loading";
    const router = useRouter();

    useEffect(() => {
        if (newsData) setItems(newsData);
    }, [newsData]);

    if (isLoadingSession || loading) {
        return <CircularProgress />;
    }

    const handleDelete = async (id: string) => {
        if (!confirm("A jeni të sigurt që doni ta fshini këtë lajm?")) return;
            await remove(`/api/news/${id}`);
        router.reload();
    };

  const renderSection = (title: string, pathPrefix: string) => (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-purple-800 drop-shadow-sm">
        {title}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {items?.slice(0, 3).map((item) => (
          <motion.section
            key={item._id}
            className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-purple-700 uppercase">{item.title}</h2>
            <p className="text-gray-700 mb-6">{item.body}</p>
            <div className="flex justify-end gap-4 mt-auto">
              <Tooltip title="Shiko Detajet">
                <IconButton onClick={() => router.push(`/news/${pathPrefix}/${item._id}`)}>
                  <View className="text-grey-400" />
                </IconButton>
              </Tooltip>
              {isAdmin && (
                <Tooltip title="Fshij Lajmin">
                  <IconButton onClick={() => handleDelete(item._id)}>
                    <Trash className="text-grey-400" />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );

  const visibleNews = isAdmin
    ? newsData || []
    : newsData?.filter((n) => n.userEmail === session?.user?.email) || [];

    return (
        <div className="pt-14 bg-gray-50 flex flex-col items-center min-h-screen">
            {/* Section: FROM MONGODB */}
            <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
            <h1 className="text-5xl font-extrabold mb-12 text-center text-purple-800 drop-shadow-sm">
                News nga Databaza MongoDB
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {visibleNews.length > 0 ? (
                visibleNews.map((item) => (
                    <motion.section
                    key={item._id}
                    className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-xl transition duration-300"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1 }}
                    >
                    <h2 className="text-2xl font-bold mb-4 text-purple-700 uppercase">
                        {item.title}
                    </h2>
                    <p className="text-gray-700 mb-6">{item.body}</p>
                    <div className="flex justify-end gap-4 mt-auto">
                        {isAdmin && (
                        <>
                            <Tooltip title="Përditëso Lajmin">
                            <IconButton onClick={() => router.push("/update/news/" + item._id)}>
                                <Edit className="text-grey-400" />
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="Fshij Lajmin">
                            <IconButton onClick={() => handleDelete(item._id)}>
                                <Trash className="text-grey-400" />
                            </IconButton>
                            </Tooltip>
                        </>
                        )}
                    </div>
                    </motion.section>
                ))
                ) : (
                <div className="py-20 text-center text-gray-600 text-xl font-medium">
                    Nuk ka lajme në databazë
                </div>
                )}
            </div>

            {/* Butoni vetem per admin */}
            {isAdmin && (
                <div className="mt-16 text-center">
                <Link href="/create/news">
                    <button className="px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white text-lg rounded-2xl shadow-lg transition">
                    + Krijo News të Ri
                    </button>
                </Link>
                </div>
            )}
            </div>

            {/* SSG, SSR, ISR sections */}
            {renderSection("News me Static Site Generation (SSG)", "ssg")}
            {renderSection("News me Server-Side Rendering (SSR)", "ssr")}
            {renderSection("News me Incremental Static Regeneration (ISR)", "isr")}
        </div>
        );
}
