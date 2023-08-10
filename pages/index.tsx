import type { NextPage } from "next";
import HomePage, {
  getStaticProps,
} from "@/modules/home/presentation/pages/home";

const Home: NextPage = (props: any) => {
  return <HomePage {...props} />;
};

export default Home;
export { getStaticProps };
