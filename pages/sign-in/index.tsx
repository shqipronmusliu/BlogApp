import router from "next/router";
import { getCsrfToken, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";


export default function SignIn({ csrfToken }: {csrfToken: string }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { data: session, status } = useSession();

    
    const handleSubmit = async (e: React.FormEvent) => {
        setError("");
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        if(res?.error){
            setError(res.error);
        }
    };
    
    useEffect(() => {
        if (status === "authenticated") {
            if (session?.user?.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/dashboard");
            }
        }
    }, [status, session]);

    return (
        <div className="pt-12">
            <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
                <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-black texl-2xl font-semibold mb-4">Kycu</h2>
                    {error && (
                        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
                        />
                        <input
                            type="password"
                            placeholder="Fjalëkalimi"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
                        />
                        <button 
                            type="submit"
                            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"

                        >
                            Kycu
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

SignIn.getInitialProps = async (context: any) => {
    return {
        csrfToken: await getCsrfToken(context),
    };
};
SignIn.displayName = "Sign In | My Application";