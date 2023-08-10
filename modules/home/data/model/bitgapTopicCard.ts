import { BitgapTopicCard } from "../../domain/entities/bitgap";

export default function bitgapTopicCardModelMapper(data: any): BitgapTopicCard {
  // console.log(data);
  const {
    id,
    title,
    description,
    totalView,
    totalLikes,
    totalComment,
    category,
    user,
    urlAddress,
    createdAt,
  } = data;

  return {
    id,
    title,
    summery: description,
    totalView,
    totalLikes,
    totalComment,
    category: {
      title: category.title,
      image: category.image,
    },
    user: {
      userCreator: user.userCreator,
      rate: user.rate,
    },
    urlAddress,
    createdAt,
  };
}
