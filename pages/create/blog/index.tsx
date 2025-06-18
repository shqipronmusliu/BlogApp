import { Blog } from "api/models/Blog";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";
import useRequireAuth from "../../../src/hooks/useRequireAuth";
import React from "react";

export default function CreateBlog() {
    const router = useRouter();
    const { data: session } = useSession();
    const [newBlog, setNewBlog] = useState({ title: "", body: "" });
    const {post} = useFetch<Blog[]>("/api/blogs");

    useRequireAuth({ role: "user", redirectTo: "/create/blog" });

    const handleCreate = async () => {
        if(!newBlog.title || !newBlog.body) return;
        if (!session || !session.user) {
            alert("Duhet të jeni i kyçur për të krijuar blog!");
            return;
        }
        const blogToSend = {
            ...newBlog,
            userEmail: session.user.email,
        };
        try {
            await post(blogToSend);
            setNewBlog({ title: "", body: "" });
            router.push("/dashboard");
        } catch (error) {
            if (error instanceof Error) {
                alert("Gabim gjatë krijimit të blogut! " + error.message);
            } else {
                alert("Gabim i panjohur gjatë krijimit të blogut!");
            }
            console.error(error);
        }
    };
   
    return(
        <div className="pt-12">
            <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
                <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-black text-2xl font-semibold mb-4">
                        Shto Blog te ri
                    </h2>
                    <input 
                        type="text" 
                        placeholder="Titulli"
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                        className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
                    />
                    <textarea 
                        placeholder="Përmbajtja"
                        value={newBlog.body}
                        onChange={(e) => setNewBlog({ ...newBlog, body: e.target.value })}
                        className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
                    />
                    <button
                        onClick={handleCreate}
                        className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                    >
                        Shto Blog
                    </button>
                </div>
            </div>
        </div>
    );
}

CreateBlog.displayName = 'Create Blog | My Application';