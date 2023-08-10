import commentModelMapper from "@/modules/app-properties/data/model/comments";
import coinDataModelMapper from "@/modules/coin/data/models/coinData";
import { HomeDataInterface } from "../../domain/entities/home";
import bitgapTopicCardModelMapper from "./bitgapTopicCard";
import newsCardModelMapper from "./newsCard";
function actionModelMapper(data: any) {
  if (!data?.route) return null;
  let { type, route, hasAuthentication } = data;
  if (type === "deeplink") {
    switch (route) {
      case "/home-page":
        route = "/trade";
        break;
      case "/portfolio-page":
        route = "/portfolio";
        break;
      case "/live-price-page":
        route = "/live-price";
        break;
      case "/price-alert-list-page":
        route = "/price-alert";
        break;
    }
  }
  return { type, route, hasAuthentication: true };
}
function carouselModelMapper(data: any) {
  const { imageUrl, action } = data;
  return {
    imageUrl,
    action: actionModelMapper(action),
  };
}
export default function homeDataModelMapper(data: any): HomeDataInterface {
  const { carousel, services, ad, news, currencies, gaps, analysis, comments } =
    data;

  return {
    carousel: carousel.map(carouselModelMapper),
    services: services.map(
      ({ name, imageUrl, action, status, badge, description }: any) => ({
        name,
        imageUrl,
        action: actionModelMapper(action),
        description: description || "از قیمت‌ها مطلع باش",
        status: {
          active: status.active,
          description: status.description,
        },
        badge: badge ? { title: badge.title } : null,
      })
    ),
    // ad: {
    //   image: ad.image,
    //   description: ad.description,
    //   action: actionModelMapper(ad.action),
    //   showOnWeb: ad.showOnWeb,
    //   showOnApp: ad.showOnApp,
    // },
    news: {
      action: actionModelMapper(news.action),
      items: news.items.map(newsCardModelMapper),
    },
    currencies: {
      action: actionModelMapper(currencies.action),
      collections: currencies.collections.map(
        ({ title, icon, items }: any) => ({
          title,
          icon,
          items: items.map((d: any) =>
            coinDataModelMapper(d, { prices: currencies.price })
          ),
        })
      ),
    },
    gaps: {
      action: actionModelMapper(gaps.action),
      collections: gaps.collections.map(
        ({ titleFa, titleEn, icon, items }: any) => ({
          titleFa,
          titleEn,
          icon,
          items: items.map(bitgapTopicCardModelMapper),
        })
      ),
    },
    analysis: {
      carousel: analysis.carousel.map(carouselModelMapper),
      strategies: {
        action: analysis?.strategies?.action,
        items: analysis.strategies.items.map((item: any) => ({
          title: item.title,
          subtitle: item.subtitle,
          image: item.image,
          url: item.url,
        })),
      },
      similarAssets: {
        action: analysis.similarAssets.action,
        items: analysis.similarAssets.items.map((item: any) => ({
          title: "شبیه‌ترین ارزها به",
          subtitle: item.name,
          image: item.image,
          url: item.url,
        })),
      },
    },
    comments: comments.map(commentModelMapper),
  };
}
