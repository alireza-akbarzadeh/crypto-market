import AppHeaderComponent from "@/core/components/layouts/app-header";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./faq.module.scss";

import Image from "next/image";
import FAQ from "@/public/images/faq.png";
// import FAQ from "@/public/images/faq.svg";
import { SearchIcon } from "@/core/components/common/custom-icon";

type PropTypes = {
  categories: { title: string; items: { title: string; lines: string[] }[] }[];
  inputValue: string;
  handleInputValueChange: (e: any) => void;
};
export default function FaqView(props: PropTypes) {
  const { categories, inputValue, handleInputValueChange } = props;
  return (
    <div className={styles.root}>
      <AppHeaderComponent
        className={styles.pageHeader}
        title="سوالات متداول"
        backHref="/profile"
      />

      <Container className={styles.container}>
        <div className={styles.paper}>
          <div className={styles.headImageWrapper}>
            <Image src={FAQ} />
          </div>

          <Grid container justifyContent="center">
            <Grid item xs={12} md={5}>
              <Typography className={styles.mainTitle}>
                سوالات متداول
              </Typography>
              <TextField
                className={styles.input}
                placeholder="جستجو"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={inputValue}
                onChange={handleInputValueChange}
                fullWidth
              />
            </Grid>
          </Grid>
          {categories.map(({ title, items }) => (
            <div key={title} className={styles.section}>
              <Typography className={styles.title} component="h2">
                {title}
              </Typography>
              <Grid container spacing={{ xs: 1, md: 3 }}>
                {items.map(({ title, lines }) => (
                  <Grid key={title} item xs={12} md={6}>
                    <Accordion
                      className="accordion"
                      variant="outlined"
                      key={title}
                    >
                      <AccordionSummary
                        classes={{
                          root: "summery",
                          expandIconWrapper: "summery-icon",
                        }}
                        expandIcon={<AddIcon />}
                      >
                        <Typography className="title" component="h3">
                          {title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {lines.map((line) => (
                          <Typography
                            className={styles.line}
                            key={line}
                            dangerouslySetInnerHTML={{ __html: line }}
                          />
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                ))}
              </Grid>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
