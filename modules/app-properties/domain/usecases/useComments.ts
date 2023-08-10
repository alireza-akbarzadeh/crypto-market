import { GetPaginateHookType } from "./../../../../core/hooks/usePaginateHelpers";
import { CommentInterface } from "@/modules/app-properties/domain/entities/comments";
import { useCommentsDS } from "../../data/datasources/app-properties.datasource";
import commentModelMapper from "../../data/model/comments";

const useComments: GetPaginateHookType<CommentInterface> = () => {
  const { rows, meta, setSize, size, isLoading, mutate } =
    useCommentsDS<CommentInterface>(commentModelMapper);

  return {
    rows,
    meta,
    size,
    setSize,
    isLoading,
    mutate,
  };
};

export default useComments;
