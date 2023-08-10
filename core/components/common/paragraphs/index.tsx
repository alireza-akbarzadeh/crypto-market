import { Typography, TypographyProps } from "@mui/material";

type PropTypes = {
  children: string;
} & TypographyProps;
export default function Paragraphs({ children, ...other }: PropTypes) {
  return (
    <>
      {children.split("\n").map((p, idx) => (
        <Typography key={idx} {...other}>
          {p}
        </Typography>
      ))}
    </>
  );
}
