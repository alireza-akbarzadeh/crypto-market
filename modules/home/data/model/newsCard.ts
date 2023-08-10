import { NewsCard } from "../../domain/entities/news";

export default function newsCardModelMapper(data: any): NewsCard {
  // console.log(data);
  const {
    id,
    faTitle,
    enTitle,
    category,
    categoryColor,
    image,
    thumbnail,
    createdAt,
    sourceLink,
    sourceLinkTitle,
    link,
  } = data;
  return {
    id,
    enTitle,
    createdAt,
    faTitle,
    summery: faTitle,
    image,
    thumbnail,
    link,
    category: {
      faTitle: category,
      enTitle: category,
      color: categoryColor,
    },
    author: {
      name: sourceLinkTitle,
      link: sourceLink,
    },
  };
}
