import { CommentInterface } from "@/modules/app-properties/domain/entities/comments";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import { BitgapTopicCard } from "./bitgap";
import { NewsCard } from "./news";

export type HomeAction = {
  type: "deeplink" | "webview";
  route: string;
  hasAuthentication?: boolean;
} | null;

export interface AnalysisCardData {
  title: string;
  subtitle: string;
  image: string;
  url: string;
}

export interface HomeDataInterface {
  carousel: {
    imageUrl: string;
    action: HomeAction;
  }[];
  services: {
    name: string;
    imageUrl: string;
    action: HomeAction;
    description: string;
    status: {
      active: boolean;
      description?: string;
    };
    badge?: { title: string };
  }[];
  // ad: {
  //   image: string;
  //   description?: string;
  //   action: HomeAction;
  //   showOnWeb: boolean;
  //   showOnApp: boolean;
  // };
  news: {
    action: HomeAction;
    items: NewsCard[];
  };
  currencies: {
    action: HomeAction;
    collections: {
      title: string;
      icon: string;
      items: CoinDataInterface[];
    }[];
  };
  gaps: {
    action: HomeAction;
    collections: {
      titleFa: string;
      titleEn: string;
      icon: string;
      items: BitgapTopicCard[];
    }[];
  };
  analysis: {
    carousel: {
      imageUrl: string;
      action: HomeAction;
    }[];
    strategies: {
      action: HomeAction;
      items: AnalysisCardData[];
    };
    similarAssets: {
      action: HomeAction;
      items: AnalysisCardData[];
    };
  };
  comments: CommentInterface[];
}
