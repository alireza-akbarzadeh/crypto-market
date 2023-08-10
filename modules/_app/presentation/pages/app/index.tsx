import AppView from "./app.view";
import { SnackbarProvider } from "notistack";
import type { AppProps } from "next/app";
import { createRef, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  useAppTheme,
  useClarity,
  useDeviceOS,
  useReactGa,
  useSentry,
} from "@/core/hooks";
import moment from "moment-jalaali";
import { Grow, IconButton } from "@mui/material";
import { useLocalStorageData } from "@/core/hooks";
import useUser from "@/modules/auth/domain/usecases/useUser";
import useAppInitials from "@/modules/_app/domain/usecases/useAppInitials";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";

moment.loadPersian({ dialect: "persian-modern" });

export default function MyApp(props: AppProps) {
  const notistackRef = createRef<any>();
  const { userLoading, user } = useUser({ revalidateOnMount: true });
  useAppInitials({ revalidateOnMount: true });
  const theme = useAppTheme();
  useLocalStorageData();
  useReactGa();
  useClarity();
  useSentry();
  const OS = useDeviceOS();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const body = document.querySelector("body");
    if (body) {
      body.classList.add(OS);
    }
    return () => {
      body?.classList.remove(OS);
    };
  }, [OS]);
  const onClickDismiss = (key: any) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          TransitionComponent={Grow as any}
          ref={notistackRef}
          autoHideDuration={3000}
          action={(key) => (
            <IconButton color="inherit" onClick={onClickDismiss(key)}>
              <CloseIcon />
            </IconButton>
          )}
          iconVariant={{
            error: <WarningIcon sx={{ mr: 1 }} />,
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <AppView
            {...props}
            {...{
              loadingUser: userLoading,
              user,
            }}
          />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}
