import { type NextPage } from "next";
import Head from "next/head";

import NumberField from "@/components/ui/NumberField";
import VerticalIndent from "@/components/icons/VerticalIdent";
import { useState } from "react";
// import { api } from "../utils/api";

const Home: NextPage = () => {

    const [number, setNumber] = useState(150)

    return (
        <>
            <Head>
                <title>Vertide</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <main className="max-w-lg mx-auto">
                <div className="h-8" />
                <div className="w-24">
                    <NumberField
                        value={number}
                        onValueChange={(v) => {
                            setNumber(v)
                        }}
                        min={100}
                        max={200}
                        icon={<VerticalIndent />}
                        placeholder="auto"
                    />
                </div>
            </main>
        </>
    );
};

export default Home;
