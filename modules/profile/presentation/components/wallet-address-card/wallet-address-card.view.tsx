import { CopyIcon, TrashIcon } from "@/core/components/common/custom-icon";
import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";
import { Button, IconButton, Paper, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./wallet-address-card.module.scss";
import tableStyles from "../wallet-address/wallet-address.module.scss";
import clsx from "clsx";
import { parseString } from "@/core/helpers";

type PropTypes = {
  isDesktopSize: boolean;
  data?: WalletAddressInterface;
  copyToClipboard: (val: string) => void;
  deleteAddress: () => void;
} & React.DetailedHTMLProps<any, any>;

export default function WalletAddressCardView(props: PropTypes) {
  const { isDesktopSize, data, copyToClipboard, deleteAddress, ...other } =
    props;
  if (isDesktopSize) {
    return (
      <div className={clsx(tableStyles.row, styles.root)} {...other}>
        <div className={styles.nameSection}>
          <div className={styles.imageWrapper}>
            {data ? (
              <Image src={data.image} alt={origin} width={46} height={46} />
            ) : (
              <Skeleton variant="circular" width={36} height={36} />
            )}
          </div>
          <div>
            <Typography component="div">
              {data ? data.faName : <Skeleton width={80} />}
            </Typography>
            <Typography component="div" variant="caption">
              {data ? data.label : <Skeleton width={40} />}
            </Typography>
          </div>
        </div>
        <div className="p-0">
          {data ? (
            <Typography
              component="div"
              className={clsx("en", styles.network)}
              style={{ backgroundColor: data.color }}
            >
              {data.networkName}
            </Typography>
          ) : (
            <Skeleton variant="rectangular" height={26} />
          )}
        </div>

        <div>
          <Typography className="ltr en" component="div">
            {data ? data.address : <Skeleton />}
          </Typography>

          {Boolean(data?.tag) && (
            <div className={styles.tagRow}>
              <Typography component="span" className={styles.label}>
                تگ یا ممو:{" "}
              </Typography>
              <Typography component="span" className={styles.tag}>
                {data.tag}
              </Typography>
            </div>
          )}
        </div>

        <div className={styles.actionSection}>
          {data ? (
            <>
              <Button
                variant="containedLight"
                color="success"
                startIcon={<CopyIcon />}
                onClick={() => copyToClipboard(data.address)}
              >
                کپی
              </Button>
              <Button
                onClick={deleteAddress}
                variant="containedLight"
                color="error"
                startIcon={<TrashIcon />}
              >
                حذف
              </Button>
            </>
          ) : (
            <>
              <Skeleton variant="rectangular" height={40} />
              <Skeleton variant="rectangular" height={40} />
            </>
          )}
        </div>
      </div>
    );
  }
  return (
    <div {...other}>
      <Paper className={styles.card}>
        <div className={styles.side}>
          {data ? (
            <>
              <div className={styles.imageWrapper}>
                <Image src={data.image} alt={origin} width={46} height={46} />
              </div>
              <Typography
                component="div"
                className={clsx("en", styles.network)}
                style={{ backgroundColor: data.color }}
              >
                {data.networkName}
              </Typography>
            </>
          ) : (
            <>
              <Skeleton variant="circular" width={46} height={46} />
              <Skeleton variant="rectangular" height={26} />
            </>
          )}
        </div>
        <div className={styles.content}>
          {data ? (
            <>
              <Typography fontWeight={700}>
                {data.faName} {data.label ? "- " + data.label : null}
              </Typography>
              <div className={styles.row}>
                <Typography color="text.secondary">آدرس: </Typography>
                <Typography component="span" className="en">
                  {parseString(data.address, 6, 15, "****")}
                </Typography>
              </div>
              <Typography color="text.secondary">
                تگ یا ممو:{" "}
                <Typography
                  color="text.primary"
                  component="span"
                  className="inline-ltr"
                >
                  {data.tag ? parseString(data.tag, 6, 15, "****") : "ندارد"}
                </Typography>
              </Typography>

              <div className={styles.action}>
                <IconButton
                  onClick={() => copyToClipboard(data.address)}
                  color="success"
                  size="small"
                >
                  <CopyIcon />
                </IconButton>
                <IconButton
                  onClick={deleteAddress}
                  sx={{ ml: 0.5 }}
                  color="error"
                  size="small"
                >
                  <TrashIcon />
                </IconButton>
              </div>
            </>
          ) : (
            <>
              <Skeleton width={100} />
              <Skeleton width={60} />
              <Skeleton width={40} />
            </>
          )}
          {/* <Typography>صادر کننده:‌ {origin}</Typography> */}
        </div>
      </Paper>
    </div>
  );
}
