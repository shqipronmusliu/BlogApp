import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Blog } from "api/models/Blog";
import { useRouter } from "next/router";
import { Trash, View } from "lucide-react";
import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import React from 'react';

export default function Blogs() {
  const { data: blogsData, loading: blogsLoading, remove } = useFetch<Blog[]>("/api/blogs");
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Blog[] | null>(null);
  const isLoadingSession = status === "loading";
  const isUser = session?.user?.role === "user";
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    if (blogsData) {
      setPosts(blogsData);
    }
  }, [blogsData]);

  if (isLoadingSession || blogsLoading) {
    return <CircularProgress />;
  }

  const router = useRouter();

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("A jeni të sigurt që doni ta fshini këtë blog?")) return;
    await remove(`/api/blogs/${id}`);
    router.reload();
  };

  const renderSection = (title: string, pathPrefix: string) => (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-purple-800 drop-shadow-sm">
        {title}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts && posts.slice(0, 3).map((post) => (
          <motion.section
            key={post._id}
            className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-purple-700 text-clamp-2 uppercase">
              {post.title}
            </h2>
            <p className="text-gray-700 mb-6 line-clamp-4">{post.body}</p>
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-auto">
              <Tooltip title="Shiko Detajet">
                <IconButton onClick={() => router.push(`/blogs/${pathPrefix}/${post._id}`)}>
                  <View className="text-grey-400" />
                </IconButton>
              </Tooltip>
              {isUser && (
              <Tooltip title="Fshij Postimin">
                <IconButton onClick={() => handleDeleteBlog(post._id)}>
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

  const visibleBlogs = isUser
    ? blogsData?.filter((b) => b.userEmail === session?.user?.email)
    : blogsData || [];

  return (
    <div className="pt-14 bg-gray-50 flex flex-col items-center min-h-screen">
      {/* Section: FROM MONGODB */}
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-purple-800 drop-shadow-sm">
          Shfaqja e Blogut nga Databaza MongoDB
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {visibleBlogs.length > 0 ? (
            visibleBlogs.map((post) => (
              <motion.section
                key={post._id}
                className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-xl transition duration-300"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-purple-700 line-clamp-2 uppercase">
                  {post.title}
                </h2>
                <p className="text-gray-700 mb-6 line-clamp-4">{post.body}</p>
                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-auto">
                  {isUser && (
                    <>
                      <Tooltip title="Perditeso Postimin">
                        <IconButton onClick={() => router.push("update/blog/" + post._id)}>
                          <Edit className="text-grey-400" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Fshij Postimin">
                        <IconButton onClick={() => handleDeleteBlog(post._id)}>
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
              Nuk ka blogs ne databaze
            </div>
          )}
        </div>
        {isUser && (
          <div className="mt-16 text-center">
            <Link href="/create/blog">
              <button className="px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white text-lg rounded-2xl shadow-lg transition">
                + Krijo Blog te Ri
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Sections for SSG, SSR, ISR */}
      {renderSection("Shfaqja e Blogut me Static Site Generation (SSG)", "ssg")}
      {renderSection("Shfaqja e Blogut me Server-Side Rendering (SSR)", "ssr")}
      {renderSection("Shfaqja e Blogut me Incremental Static Regeneration (ISR)", "isr")}
    </div>
  );
}

Blogs.displayName = "Blogs | My Application";
