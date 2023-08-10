import {
  useErrorHandler,
  useIsMobileSize,
  usePaginateHelpers,
} from "@/core/hooks";
import useUser from "@/modules/auth/domain/usecases/useUser";
import changeProfileAvatar from "@/modules/profile/domain/usecases/changeProfileAvatar";
import useProfileAvatar from "@/modules/profile/domain/usecases/useProfileAvatar";
import {
  GridOnItemsRenderedProps,
  ListOnItemsRenderedProps,
} from "react-window";
import AvatarModalView from "./avatar-modal.view";

type PropTypes = {
  open: boolean;
  onClose: () => void;
};
const columnCount = 4;
export default function AvatarModalComponent(props: PropTypes) {
  const { open, onClose } = props;
  const { rows, fakeItemCount, isLoading, handleItemLoaded, handleLoadMore } =
    usePaginateHelpers(useProfileAvatar, 15);
  const isMobileSize = useIsMobileSize();
  const { user, mutate } = useUser();
  const errorHandler = useErrorHandler();

  const handleItemsRendered =
    (onItemsRendered: (props: ListOnItemsRenderedProps) => any) =>
    (params: GridOnItemsRenderedProps) => {
      const {
        visibleColumnStartIndex,
        visibleColumnStopIndex,
        visibleRowStartIndex,
        visibleRowStopIndex,
        overscanColumnStartIndex,
        overscanColumnStopIndex,
        overscanRowStartIndex,
        overscanRowStopIndex,
      } = params;
      const overscanStartIndex =
        overscanRowStartIndex * columnCount + overscanColumnStartIndex;
      const overscanStopIndex =
        overscanRowStopIndex * columnCount + overscanColumnStopIndex;
      const visibleStartIndex =
        visibleRowStartIndex * columnCount + visibleColumnStartIndex;
      const visibleStopIndex =
        visibleRowStopIndex * columnCount + visibleColumnStopIndex;

      onItemsRendered({
        overscanStartIndex,
        overscanStopIndex,
        visibleStartIndex,
        visibleStopIndex,
      });
    };

  const onSelect = async (id: string) => {
    onClose();
    if (id === user?.avatarId) return;

    const { data, error } = await changeProfileAvatar(id);
    if (error) {
      errorHandler(error);
      return;
    }
    mutate();
  };

  return (
    <AvatarModalView
      {...{
        open,
        onClose,
        data: rows,
        itemCount: fakeItemCount,
        isLoading,
        handleItemLoaded,
        handleLoadMore,
        handleItemsRendered,
        columnCount,
        isMobileSize,
        selectedId: user?.avatarId,
        onSelect,
      }}
    />
  );
}
