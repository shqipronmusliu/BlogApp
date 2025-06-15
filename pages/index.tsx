import Image from "next/image";
import { motion } from "framer-motion";
import CustomImage from "@/assets/images/image.jpg";
import Button from "@/components/shared/Button/index";
import Card from "@/components/shared/Card";
import { Rocket, BarChart, ShieldCheck, Circle, Trash } from "lucide-react";
import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";

export interface Post {
  id: string;
  title: string;
  body: string;
}


export default function Home() {
  const {data: initialPosts, loading} = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"

  );

  const [posts, setPosts] = useState<Post[] | null>([]);
  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  const handleDelete = (id: string) => {
    if(posts){
      setPosts(posts.filter((post) => post.id !== id));
    }
  }

  return (
    <div className="pt-14 bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="w-full py-24 bg-purple-700 text-white text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl text-primary font-extrabold mb-4">
          Mirë se Vini në Aplikacionin Tonë!
        </h1>
        <p className="text-xl mb-6">
          Ndërtoni aplikacione të fuqishme dhe të shpejta me Next.js
        </p>
        <Button
          text="Mëso Më Shumë" 
          variant="secondary" 
          onClick={() => alert("Redirecting...")} 
        />
      </motion.section>

      {/* About Section */}
      <motion.section
        className="max-w-6xl mx-auto py-20 px-6 text-center"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-purple-700">
          Rreth Nesh
        </h2>
        <p className="text-gray-700 mb-6">
          Ne krijojmë aplikacione të avancuara duke përdorur teknologjitë më të fundit. 
          Fokusimi ynë kryesor është të ofrojmë produkte të optimizuara dhe SEO-friendly.
        </p>
        <Image
          src={CustomImage}
          alt="Imazh Rreth Nesh"
          width={500}
          height={300}
          className="rounded-xl shadow-lg mx-auto"
          priority
        />
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="w-full py-20 bg-gray-200 text-center"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="container m-auto px-6">
          <h2 className="text-4xl font-bold mb-6 text-purple-700">
            Karakteristikat Kryesore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              title="Shpejtësi & Performancë" 
              description="Aplikacionet me te shpejta me optimizim te avancuar." 
              icon={Rocket} 
            />
            <Card 
              title="SEO e Avancuar" 
              description="Rankim me i mire ne motoret e kerkimit." 
              icon={BarChart} 
            />
            <Card 
              title="Siguri Maksimale" 
              description="Mbrojtje e te dhenave dhe siguri e larte per perdoruesit." 
              icon={ShieldCheck} 
            />
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="max-w-6xl mx-auto py-20 px-6 text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-purple-700">
          Shërbimet Tona
        </h2>
        <p className="text-gray-700 mb-6">
          Ofrojmë një gamë të gjerë shërbimesh duke 
          përfshirë zhvillimin e aplikacioneve web,
          optimizimin për SEO dhe integrimin me API të jashtme.
        </p>
        <Button 
          text="Shikoni Sherbimet"
          onClick={() => alert("Redirecting...")}
          />
      </motion.section>

      { /* Blog Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-20 bg-purple-50">
        {loading ? 
        <CircularProgress />

        :
        <>
        {posts && posts?.map((post) => 
          <motion.section
            key={post.id}
            className="bg-white p-6 rounded-xl shadow-md text-left flex flex-col"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-bold text-purple-700 line-clamp-2 md-2">{post.title}</h3>
            <p className="text-gray-600 mb-4 flex-1">{post.body}</p>
            <div className="flex items-end justify-end">
              <Tooltip title="Fshij Postin">
                <IconButton onClick={()=> handleDelete(post.id)}>
                  <Trash className="text-grey-400"/>   
                </IconButton>
              </Tooltip>
            </div>
          </motion.section>
        )}
        </>
        }
      </div>

      {/* Contact Section */}
      <motion.section
        className="w-full py-20 bg-purple-700 text-black text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-6">Kontaktoni Me Ne</h2>
        <p className="mb-1">Email: contact@mycompany.com</p>
        <p className="mb-1">Tel: +383 123 456 789</p>
        <p className="mb-6">Adresa: Prishtinë, Kosovë</p>
        <Button
          text="Na Kontaktoni"
          variant="secondary"
          onClick={() => alert("Opening Contact Form...")}
        />
      </motion.section>
    </div>
  );
}

Home.displayName = "My Application";