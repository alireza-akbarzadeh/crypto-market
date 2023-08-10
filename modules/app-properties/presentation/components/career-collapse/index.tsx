import { useState } from "react";
import CareerCollapseView from "./career-collapse.view";

type PropTypes = {};
export default function CareerCollapseComponent(props: PropTypes) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((o) => !o);
  };

  return <CareerCollapseView {...{ open, toggleOpen }} />;
}
