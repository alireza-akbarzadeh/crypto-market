import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import CareerPostView from "./career-post.view";

export type PropTypes = {
  career: { id: string };
};
const careers = [{ id: "id" }, { id: "id2" }, { id: "id3" }];

export default function CareerPostPage(props: PropTypes) {
  const router = useRouter();
  return <CareerPostView {...{ isFallback: router.isFallback }} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const res = await fetch("https://.../posts");
  // const posts = await res.json();

  const paths = careers.map((career) => ({
    params: { id: career.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  // const res = await fetch(`https://.../posts/${params.id}`);
  // const post = await res.json();
  const data = params?.id ? careers.find((c) => c.id === params.id) : undefined;
  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { career: data }, revalidate: 10 };
};
