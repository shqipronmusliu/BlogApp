import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import useFetch from "../src/hooks/useFetch";
import useRequireAuth from "../src/hooks/useRequireAuth";
import { Blog } from "api/models/Blog";
import { useRouter } from "next/router";
import { Trash, Edit } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import React from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  useRequireAuth(status);
  const router = useRouter();
  const { data: blogsData = [], loading, remove } = useFetch<Blog[]>("/api/blogs");

  if (status === "loading" || loading) return <CircularProgress />;
  if (status !== "authenticated") return <div>Ju lutem kyquni.</div>;

  const blogsArray = Array.isArray(blogsData) ? blogsData : [];

  const userBlogs = blogsArray.filter(
    blog => blog.userEmail === session.user.email
  );

  const handleDeleteBlog = async (id: string) => {
    const confirmed = confirm("A jeni të sigurt që doni ta fshini këtë blog?");
    if (!confirmed) return;

    try {
      await remove(`/api/blogs/${id}`);
      alert("Blogu u fshi me sukses!");
      router.reload();
    } catch (error) {
      alert("Gabim gjatë fshirjes së blogut!");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-14">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-auto px-8 py-12 pb-12 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-4xl font-bold text-blue-800">Blogs</h1>
              <Link href={"/create/blog"}>
                <button className="px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white text-lg rounded-2xl shadow-lg transition">
                  + Krijo Blog te Ri
                </button>
              </Link>
            </div>
            {userBlogs.length === 0 ? (
              <div className="text-2xl font-bold mb-4 text-blue-700 text-clamp-2 uppercase">
                Nuk keni ende asnjë blog.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {userBlogs.map((blog) => (
                  <motion.section
                    key={blog._id}
                    className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-xl transition duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-2xl font-bold mb-4 text-blue-700 line-clamp-2 uppercase">
                      {blog.title}
                    </h2>
                    <p className="text-gray-700 mb-6 line-clamp-4">{blog.body}</p>
                    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-auto">
                      <Tooltip title="Perditëso Blogun">
                        <IconButton
                          onClick={() => router.push("/update/blog/" + blog._id)}
                        >
                          <Edit className="text-grey-400" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Fshij Blogun">
                        <IconButton onClick={() => handleDeleteBlog(blog._id!)}>
                          <Trash className="text-grey-400" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </motion.section>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
