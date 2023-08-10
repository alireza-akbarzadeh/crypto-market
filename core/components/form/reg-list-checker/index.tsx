import { useMemo } from "react";
import RegListCheckerView from "./reg-list-checker.view";

type PropTypes = {
  title?: string;
  value: string;
  list: { title: string; reg: RegExp }[];
};
export default function RegListCheckerComponent(props: PropTypes) {
  const { title, list, value } = props;

  const resultList = useMemo(() => {
    return list.map(({ title, reg }) => ({
      title,
      fulfilled: reg.test(value),
    }));
  }, [value, list]);

  return (
    <RegListCheckerView
      {...{
        title,
        list: resultList,
      }}
    />
  );
}
