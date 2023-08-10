import { GetStaticPaths, GetStaticProps } from "next";
import { MouseEventHandler } from "react";
import CoinDetailsView from "./coin-details.view";

const coins = [{ name: "bitcoin" }];
export type PropTypes = {
  coin: any;
};
export default function CoinDetailsPage(props: PropTypes) {
  return <CoinDetailsView {...props} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const res = await fetch("https://.../posts");
  // const posts = await res.json();

  const paths = coins.map((coin) => ({
    params: { coin: coin.name },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  if (typeof params?.coin !== "string") return { notFound: true };
  // const res = await fetch(`https://.../posts/${params.id}`);
  // const post = await res.json();
  const data = coins.find(
    (c) => c.name.toLowerCase() === (params.coin as string).toLowerCase()
  );
  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { coin: data }, revalidate: 10 };
};
