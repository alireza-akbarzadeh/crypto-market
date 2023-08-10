import { GetPaginateHookType } from "@/core/hooks/usePaginateHelpers";
import { useProfileAvatarDS } from "../../data/datasources/profile.datasource";
import profileAvatarModelMapper from "../../data/model/profileAvatar";
import { ProfileAvatar } from "../entities/avatar";

const useProfileAvatar: GetPaginateHookType<ProfileAvatar> = () => {
  const { rows, meta, setSize, size, isLoading, mutate } =
    useProfileAvatarDS<ProfileAvatar>(profileAvatarModelMapper);

  return {
    rows,
    meta,
    size,
    setSize,
    isLoading,
    mutate,
  };
};

export default useProfileAvatar;
