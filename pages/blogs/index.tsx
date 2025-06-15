import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Blog } from "api/models/Blog";
import { useRouter } from "next/router";
import { Trash, View, ViewIcon } from "lucide-react";
import { Edit } from "lucide-react";

export interface Post{
  id: string;
  title: string;
  body: string;
}

export default function Blogs(){
  const {data: initialPosts, loading} = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const [posts, setPosts] = useState<Post[] | null>();

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  const handleDelete = (id: string) => {
    if(posts){
      setPosts(posts?.filter((post) => post.id !== id));
    }
  };

  // Blogs nga Databaza MongoDB
  const router = useRouter();
  const {data: blogsData, loading: blogsLoading, remove} = useFetch<Blog[]>("/api/blogs");

  const handleDeleteBlog = async (id: string) => {
    const confirmed = confirm("A jeni te sigurt qe doni ta fshini kete blog?");
    if(!confirmed) return;

    try{
      await remove(`/api/blogs/${id}`);
      alert("Blogu u fshi me sukses!");
      router.reload();
    } catch (error) {
      alert("Gabim gjate fshirjes se blogut!");
      console.error(error);
    }
  };
  return (
    <div className="pt-14 bg-gray-50 flex flex-col items-center min-h-screen">
      { /* Blog Section: FROM OUR DATABASE */}
      {blogsLoading ? (
        <CircularProgress/>
      ) : (
        <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
          <h1 className="text-5xl font-extrabold mb-12 text-center text-purple-800 drop-shadow-sm">
            Shfaqja e Blogut nga Databaza MongoDB
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogsData && blogsData.length > 0? (
              blogsData.map((post: Blog) => (
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
                    <Tooltip title="Perditeso Postimin">
                      <IconButton onClick={()=> router.push("update/blog/" + post._id)}>
                        <Edit className="text-grey-400"/>   
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Fshij Postimin">
                      <IconButton onClick={()=> handleDeleteBlog(post._id!)}>
                        <Trash className="text-grey-400"/>   
                      </IconButton>
                    </Tooltip>
                  </div>
                </motion.section>
              ))
            ) : (
              <div className="py-20 text-center text-gray-600 text-xl font-medium">
                Nuk ka blogs ne databaze
              </div>
            )}
          </div>
          <div className="mt-16 text-center">
            <Link href={"/create/blog"}>
              <button className="px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white text-lg rounded-2xl shadow-lg transition">
                + Krijo Blog te Ri
              </button>
            </Link>
          </div>
        </div>
      )}


      { /* Blog Section: Single Page Loading with Static Site Generation(SSG) */}
      {loading ?(
      <CircularProgress />
      ):(
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-purple-800 drop-shadow-sm">
          Shfaqja e Blogut ne Single Page me Static Site Generation (SSG)
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts && posts.slice(0,3).map((post: Post) =>
            <motion.section
              key={post.id}
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
                  <IconButton onClick={()=> router.push("/blogs/ssg/" + post.id)}>
                    <View className="text-grey-400"/>   
                  </IconButton>
                </Tooltip>
                <Tooltip title="Fshij Postimin">
                  <IconButton onClick={()=> handleDeleteBlog(post.id)}>
                    <Trash className="text-grey-400"/>   
                  </IconButton>
                </Tooltip>
              </div>
            </motion.section> 
          )}
        </div>
      </div>
      )}
      {/* Blog Section: Single Page Loading with Server-Side Rendering (SSR) */}
      {loading ?(
      <CircularProgress />
      ):(
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-purple-800 drop-shadow-sm">
          Shfaqja e Blogut ne Single Page me Server-Side Rendering (SSR)
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts && posts.slice(0,3).map((post: Post) =>
            <motion.section
              key={post.id}
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
                  <IconButton onClick={()=> router.push("/blogs/ssr/" + post.id)}>
                    <View className="text-grey-400"/>   
                  </IconButton>
                </Tooltip>
                <Tooltip title="Fshij Postimin">
                  <IconButton onClick={()=> handleDeleteBlog(post.id)}>
                    <Trash className="text-grey-400"/>   
                  </IconButton>
                </Tooltip>
              </div>
            </motion.section> 
          )}
        </div>
      </div>
      )}
      {/* Blog Section: Single Page Loading with Incremental Static Regeneration (ISR) */}
      {loading ?(
      <CircularProgress />
      ):(
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-purple-800 drop-shadow-sm">
          Shfaqja e Blogut ne Single Page me Incremental Static Regeneration (ISR)
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts && posts.slice(0,3).map((post: Post) =>
            <motion.section
              key={post.id}
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
                  <IconButton onClick={()=> router.push("/blogs/isr/" + post.id)}>
                    <View className="text-grey-400"/>   
                  </IconButton>
                </Tooltip>
                <Tooltip title="Fshij Postimin">
                  <IconButton onClick={()=> handleDeleteBlog(post.id)}>
                    <Trash className="text-grey-400"/>   
                  </IconButton>
                </Tooltip>
              </div>
            </motion.section> 
          )}
        </div>
      </div>
      )}
      
    </div>
  );
}

Blogs.displayName = "Blogs | My Application";