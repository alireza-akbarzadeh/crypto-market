import profileStyles from "../../utils/profile-sections.module.scss";
import styles from "./wallet-address.module.scss";
import { Box, Button, Typography } from "@mui/material";
import WalletAddressCardComponent from "../wallet-address-card";
import AddIcon from "@mui/icons-material/ControlPointRounded";
import clsx from "clsx";
import InfiniteListComponent from "@/core/components/common/infinite-list";
import useWalletAddressList from "@/modules/wallet/domain/usecases/useWalletAddressList";
import { areEqual } from "react-window";
import { memo } from "react";
import LoadingComponent from "@/core/components/common/loading";
import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";
import Link from "next/link";
import EmptyContentComponent from "@/core/components/common/empty-content";

type PropTypes = {
  isDesktopSize: boolean;
  openAddressModal: () => void;
  deleteAddress: (data: WalletAddressInterface) => void;
};
export default function WalletAddressView(props: PropTypes) {
  const { isDesktopSize, openAddressModal, deleteAddress } = props;
  return (
    <InfiniteListComponent
      {...{
        pageSize: 5,
        getHook: useWalletAddressList,
        getItemData: (rows) => ({ rows, isDesktopSize, deleteAddress }),
        itemSize: isDesktopSize ? 83 : 134,
        Row,
      }}
    >
      {({ List, rows, isLoading }) => {
        if (!isLoading && !rows.length) {
          if (isDesktopSize) {
            return (
              <>
                <Box
                  mb={3}
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Link href="/how-to-create-wallet" passHref>
                    <Typography component="a" color="primary" target="_blank">
                      راهنمای ساخت کیف پول ارزی
                    </Typography>
                  </Link>
                  <EmptyContentComponent
                    message="هنوز هیچ آدرسی ثبت نشده است."
                    buttonProps={{
                      onClick: openAddressModal,
                      label: "ثبت آدرس ارزی جدید",
                    }}
                    className={styles.openAddressModal}
                  />
                </Box>
              </>
            );
          }
          return (
            <div className={profileStyles.propertiesContainer}>
              <Typography className={profileStyles.description}>
                برای خرید ارز لازم است آدرس کیف پول خود را ثبت نمایید.
              </Typography>
              <Button
                onClick={openAddressModal}
                className={profileStyles.addButton}
                variant="dashed"
                fullWidth
                startIcon={<AddIcon />}
              >
                ثبت آدرس ارزی
              </Button>
              <Link href="/how-to-create-wallet" passHref>
                <Typography
                  component="a"
                  color="primary"
                  target="_blank"
                  // sx={{ mt: -4, mb: 4 }}
                >
                  راهنمای ساخت کیف پول ارزی
                </Typography>
              </Link>
              <EmptyContentComponent
                message="هنوز هیچ آدرسی ثبت نشده است."
                // buttonProps={{
                //   onClick: openAddressModal,
                //   label: "ثبت آدرس ارزی جدید",
                // }}
                className={styles.openAddressModal}
              />
            </div>
          );
        }
        if (isDesktopSize) {
          return (
            <div className={profileStyles.propertiesDesktop}>
              <Button
                onClick={openAddressModal}
                className={profileStyles.addButton}
                variant="dashed"
              >
                ثبت آدرس ارزی جدید
              </Button>
              <div className={clsx(profileStyles.table, styles.table)}>
                <div
                  className={clsx(
                    profileStyles.headRow,
                    styles.row,
                    styles.header
                  )}
                >
                  <Typography>نام کیف پول</Typography>
                  <Typography>شبکه</Typography>
                  <Typography>آدرس ارزی</Typography>
                  <Typography>عملیات</Typography>
                </div>
                {List}
                {isLoading && <LoadingComponent />}
              </div>
            </div>
          );
        }
        return (
          <div className={profileStyles.propertiesContainer}>
            <Typography className={profileStyles.description}>
              برای خرید ارز لازم است آدرس کیف پول خود را ثبت نمایید.
            </Typography>
            <Button
              onClick={openAddressModal}
              className={profileStyles.addButton}
              variant="dashed"
              fullWidth
              startIcon={<AddIcon />}
            >
              ثبت آدرس ارزی
            </Button>
            {List}
            {isLoading && <LoadingComponent />}
          </div>
        );
      }}
    </InfiniteListComponent>
  );
}

const Row = memo(({ index, style, data }: any) => {
  const { rows, isDesktopSize, deleteAddress } = data;
  return (
    <WalletAddressCardComponent
      {...{ style, data: rows[index], isDesktopSize, deleteAddress }}
    />
  );
}, areEqual);
