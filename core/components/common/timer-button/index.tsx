import { useTimer } from "@/core/hooks";
import { ButtonProps } from "@mui/material";
import TimerButtonView from "./timer-button.view";

type PropTypes = {
  time: number;
} & ButtonProps;
export default function TimerButtonComponent(props: PropTypes) {
  const { time } = props;
  const timer = useTimer(time);

  return <TimerButtonView {...{ timer, ...props }} />;
}
