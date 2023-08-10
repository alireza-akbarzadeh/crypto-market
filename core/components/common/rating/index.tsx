import MuiRating from "@mui/material/Rating";
import { RatingProps } from "@mui/material";
import { RateStarIcon, RateStarOutlineIcon } from "../custom-icon";
import clsx from "clsx";

export default function Rating(props: RatingProps) {
  return (
    <MuiRating
      precision={0.2}
      size="small"
      icon={<RateStarIcon fontSize="inherit" />}
      emptyIcon={<RateStarOutlineIcon fontSize="inherit" />}
      {...props}
      className={clsx("mirror", props.className)}
    />
  );
}
