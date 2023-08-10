import { useSelector, useUpdateEffect } from "@/core/hooks";
import { GetPaginateHookType } from "./../../../../core/hooks/usePaginateHelpers";
import { CommentInterface } from "@/modules/app-properties/domain/entities/comments";
import { useContactUsDS } from "../../data/datasources/app-properties.datasource";
import commentModelMapper from "../../data/model/comments";

const useContactUs: GetPaginateHookType<CommentInterface> = () => {
  const { rows, meta, setSize, size, isLoading, mutate } =
    useContactUsDS<CommentInterface>(commentModelMapper);
  const { token } = useSelector((state) => state.auth);

  useUpdateEffect(() => {
    if (token) mutate();
  }, [token]);

  return {
    rows,
    meta,
    size,
    setSize,
    isLoading,
    mutate,
  };
};

export default useContactUs;
