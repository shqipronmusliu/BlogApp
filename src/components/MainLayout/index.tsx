import Head from "next/head";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

interface Props {
    children?: ReactNode;
    name?: string;
}

export function MainLayout(props: Props) {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900">
            <Head>
                <title>{props.name}</title>
            </Head>

            <Header />

            <main className="flex-grow">
                {props.children}
            </main>

            <Footer />
        </div>
    );
}

export default MainLayout;