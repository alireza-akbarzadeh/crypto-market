import AppHeaderView from "./app-header.view";
import { useEffect, useState } from "react";
import { AppBarProps } from "@mui/material";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { useDispatch } from "@/core/hooks";
import { openLoginModal } from "@/modules/auth/presentation/redux";
import useAppInitials from "@/modules/_app/domain/usecases/useAppInitials";
import { useRouter } from "next/router";

type PropTypes = {
  children?: any;
  toolbarContent?: any;
  bgcolor?: string;
  elevation?: number;
  endLogo?: boolean;
  skipHolder?: boolean;
  backHref?: string;
  title?: string;
} & AppBarProps;
export default function AppHeaderComponent(props: PropTypes) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, userLoading } = useUser();
  const { data: appInitials } = useAppInitials();
  const [announcementClosed, setAnnouncementClosed] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!appInitials) return;
    if (typeof window === "undefined") return;
    const lastClosed = localStorage.getItem("announcementClosed");
    if (lastClosed && +lastClosed > appInitials?.announcement.updatedAt) return;
    setAnnouncementClosed(false);
  }, [appInitials?.announcement.updatedAt]);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const closeAnnouncement = () => {
    setAnnouncementClosed(true);
    localStorage.setItem("announcementClosed", Date.now().toString());
  };
  const handleBack = (e: any) => {
    if (window?.history?.state?.idx) {
      e.preventDefault();
      router.back();
    }
  };

  if (router.query.application) return null;
  return (
    <AppHeaderView
      {...props}
      {...{
        sidebarOpen,
        appInitials,
        openSidebar,
        closeSidebar,
        user,
        userLoading: userLoading,
        openLoginModal: () => {
          dispatch(openLoginModal());
        },
        closeAnnouncement,
        announcementClosed,
        handleBack,
      }}
    />
  );
}
