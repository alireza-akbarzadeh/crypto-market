import { usePaginateHelpers } from "@/core/hooks";
import { FaqInterface } from "@/modules/support/domain/entities/faq";
import useSupportTutorials from "@/modules/support/domain/usecases/useSupportTutorials";
import { useState } from "react";
import NewComersView from "./new-comers.view";

type PropTypes = {};
export default function NewComersComponent(props: PropTypes) {
  const [selected, setSelected] = useState<FaqInterface>();
  const { rows, meta, setSize, isLoading } = usePaginateHelpers(
    useSupportTutorials,
    20
  );
  const handleScroll = (e: any) => {
    const { scrollHeight, scrollTop, offsetHeight } = e.target;
    const scrollBottom = scrollHeight - (scrollTop + offsetHeight);
    if (isLoading || scrollBottom > 60 || !meta) return;

    const { currentPage, lastPage } = meta.paginateHelper;
    if (currentPage >= lastPage) return;

    setSize(currentPage + 1);
  };

  return (
    <NewComersView
      {...{
        selected,
        setSelected: (s) => setSelected(s),
        handleScroll,
        rows,
        isLoading,
      }}
    />
  );
}
