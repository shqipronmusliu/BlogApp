import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import { User } from "@/api/models/User";
import React from 'react';

type Props = {
  initialName: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const session = await getSession({ req });
  if (!session || session.user.role !== "admin") {
    return { redirect: { destination: "/", permanent: false } };
  }

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
    headers: { cookie: req.headers.cookie! },
  });
  const users: User[] = await res.json();
  const me = users.find((u) => u.email === session.user?.email);

  if (!me) return { notFound: true };

  return {
    props: {
      initialName: me.name ?? "",
    },
  };
};

export default function AdminProfile({ initialName }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState(initialName);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/users/" + session?.user.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });
      if (!res.ok) throw new Error(await res.text());

      setMsg("Profili u përditësua me sukses.");
      setPassword("");
      router.replace(router.asPath);
    } catch (err: any) {
      setMsg(err.message || "Gabim gjatë përditësimit.");
    }
    setLoading(false);
  };

  return (
    <div className="flex pt-14 min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Profili i Adminit</h1>
        <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 shadow rounded-xl">
          <label className="block mb-2 text-gray-900">Email</label>
          <input
            type="email"
            readOnly
            value={session?.user.email || ""}
            className="w-full mb-4 p-2 border rounded bg-gray-100 text-gray-900"
          />

          <label className="block mb-2 text-gray-900">Emri</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-2 border rounded text-gray-900"
          />

          <label className="block mb-2 text-gray-900">Fjalëkalimi i ri</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded text-gray-900"
            placeholder="Fjalëkalim i ri"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Duke u përditësuar..." : "Përditëso Profilin"}
          </button>

          {!!msg && <p className="mt-4 text-center text-green-600">{msg}</p>}
        </form>
      </main>
    </div>
  );
}
