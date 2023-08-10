import { Fetcher } from "swr";
import { PublicConfiguration } from "swr/dist/types";
export type PaginateHelperType = {
  currentPage: number;
  currentCount: number;
  total: number;
  lastPage: number;
  pageSize: number;
};
export type DefaultFetchConfig = Partial<
  PublicConfiguration<any, any, Fetcher<any>>
>;
