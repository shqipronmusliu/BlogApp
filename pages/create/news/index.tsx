import { News } from "api/models/News";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useState } from "react";
import useRequireAuth from "../../../src/hooks/useRequireAuth";



export default function CreateNews() {
    const router = useRouter();
    const [newNews, setNewNews] = useState({ title: "", body: "" });
    const {post} = useFetch<News[]>("/api/news");

    useRequireAuth({ role: "user", redirectTo: "/create/news" });

    const handleCreate = async () => {
        if(!newNews.title || !newNews.body) return;
        await post(newNews);
        setNewNews({ title: "", body: "" });
        router.push("/news");
    };
    return(
        <div className="pt-12">
            <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
                <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-black text-2xl font-semibold mb-4">
                        Shto News te ri
                    </h2>
                    <input 
                        type="text" 
                        placeholder="Titulli"
                        value={newNews.title}
                        onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                        className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
                    />
                    <textarea 
                        placeholder="Përmbajtja"
                        value={newNews.body}
                        onChange={(e) => setNewNews({ ...newNews, body: e.target.value })}
                        className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
                    />
                    <button
                        onClick={handleCreate}
                        className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                    >
                        Shto News
                    </button>
                </div>
            </div>
        </div>
    );
}

CreateNews.displayName = 'Create News | My Application';