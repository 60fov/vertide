import { type NextPage } from "next";
import Head from "next/head";

import Editor from "@/components/Editor";
// import { api } from "../utils/api";

const Home: NextPage = () => {
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
      <main className="font-serif p-4 max-h-[400px] md:max-h-[600px] h-screen">
        <Editor initialValue="안녕 👋, feel free to edit me..." />
      </main>
    </>
  );
};

export default Home;
