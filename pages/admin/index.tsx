import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { useSession,getSession } from "next-auth/react";
import useFetch from "../../src/hooks/useFetch";
import useRequireAuth from "../../src/hooks/useRequireAuth";
import { News } from "api/models/News";
import { useRouter } from "next/router";
import { Trash, Edit } from "lucide-react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import React from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || session.user.role !== "admin") {
      return {
         redirect: {
            destination: "/sign-in",
            permanent: false,
         },
      };
  }

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/news`, {
      headers: {
         cookie: context.req.headers.cookie || "",
      },
   });

  const newsData = await res.json();

  return {
      props: {
         newsData,
      },
   };
};

type Props = {
  newsData: News[];
};



export default function AdminPanel({ newsData }: Props) {
  const { data: session, status } = useSession();
  useRequireAuth(status);
  const router = useRouter();

  if (status === "loading") return <CircularProgress />;
  if (status !== "authenticated" || session.user.role !== "admin") {
    return <div className="text-center mt-10 text-xl font-semibold">Vetëm adminët kanë qasje këtu.</div>;
  }

  const newsArray = Array.isArray(newsData) ? newsData : [];

  const handleDeleteNews = async (id: string) => {
      const confirmed = confirm("A jeni të sigurt që doni ta fshini këtë lajm?");
      if (!confirmed) return;

      try {
         await fetch("/api/news/" + id, { method: "DELETE" });
            alert("Lajmi u fshi me sukses!");
         router.reload();
      }catch (error) {
         alert("Gabim gjatë fshirjes së lajmit!");
         console.error(error);
      }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-14">
      <div className="flex flex-1">
         <AdminSidebar />
        <main className="flex-1 ml-auto px-8 py-12 pb-12 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-4xl font-bold text-blue-800">Paneli i Adminit</h1>
              <Link href="/create/news">
                <button className="px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white text-lg rounded-2xl shadow-lg transition">
                  + Shto Lajm
                </button>
              </Link>
            </div>
            {newsData.length === 0 ? (
              <div className="text-2xl font-bold mb-4 text-blue-700 text-clamp-2 uppercase">
                Nuk ka asnjë lajm të shtuar.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {newsData.map((news) => (
                  <motion.section
                    key={news._id}
                    className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-xl transition duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-2xl font-bold mb-4 text-blue-700 line-clamp-2 uppercase">
                      {news.title}
                    </h2>
                    <p className="text-gray-700 mb-6 line-clamp-4">{news.body}</p>
                    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-auto">
                      <Tooltip title="Perditëso Lajmin">
                        <IconButton
                          onClick={() => router.push("/update/news/" + news._id)}
                        >
                          <Edit className="text-grey-400" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Fshij Lajmin">
                        <IconButton onClick={() => handleDeleteNews(news._id!)}>
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
