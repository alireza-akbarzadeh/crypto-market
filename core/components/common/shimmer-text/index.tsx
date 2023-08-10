import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import clsx from "clsx";

export default function ShimmerText({ className, ...props }: any) {
  const theme = useTheme();
  const color = theme.palette.text.primary;
  return (
    <Typography
      {...props}
      className={clsx("shimmer", className)}
      sx={{
        backgroundImage: `linear-gradient(90deg, ${color} 0%, ${theme.palette.background.default} 50%, ${color} 100%)`,
        backgroundColor: color,
      }}
    />
  );
}
