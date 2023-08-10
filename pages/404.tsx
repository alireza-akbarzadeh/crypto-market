import NotFoundPage from "@/modules/_app/presentation/pages/not-found";
import type { NextPage } from "next";
import Head from "next/head";

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <NotFoundPage />
    </>
  );
};

export default NotFound;
