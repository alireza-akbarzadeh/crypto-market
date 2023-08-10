// export interface NewsCategory {
//   enTitle: string;
//   faTitle: string;
//   color: string;
//   icon?: string;
//   id?: string | number;
// }
export interface BitgapTopicCard {
  id: number | string;
  title: string;
  summery: string;
  totalView: number;
  totalLikes: number;
  totalComment: number;
  category: {
    title: string;
    image: string;
  };
  user: {
    userCreator: string;
    rate: number;
  };
  urlAddress: string;
  createdAt: string;
}
