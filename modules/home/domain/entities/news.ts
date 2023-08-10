export interface NewsCategory {
  enTitle: string;
  faTitle: string;
  color: string;
  icon?: string;
  id?: string | number;
}
export interface NewsCard {
  id: number | string;
  enTitle: string;
  createdAt: string;
  faTitle: string;
  summery: string;
  image: string;
  thumbnail: string;
  category: NewsCategory;
  link: string;
  author: {
    name: string;
    link: string;
  };
}
