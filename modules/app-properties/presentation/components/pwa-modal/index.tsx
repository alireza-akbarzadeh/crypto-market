import { useMemo } from "react";
import PwaModalView from "./pwa-modal.view";
import {
  IosAddIcon,
  IosShareIcon,
  IosAddTextIcon,
  SafariIcon,
  ChromeIcon,
  InstallIcon,
} from "@/core/components/common/custom-icon";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktopOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlineRounded";
import MoreVertIcon from "@mui/icons-material/MoreVertRounded";
import { UAParser } from "ua-parser-js";
const iosList = [
  {
    title: "در نوار پایین روی دکمه <span>Share</span> بزنید.",
    icon: IosShareIcon,
  },
  {
    title:
      "در منوی بازشده، در قسمت پایین، گزینه <span>Add to Home Screen</span> را انتخاب کنید.",
    icon: IosAddIcon,
  },
  {
    title: "در مرحله بعد در قسمت بالا روی <span>Add</span> بزنید.",
    icon: IosAddTextIcon,
  },
];
const androidList = [
  {
    title: "در نوار بالا روی دکمه <span>More</span> بزنید.",
    icon: MoreVertIcon,
  },
  {
    title:
      "در پنجره بازشده، گزینه <span>Add to Home Screen</span> را انتخاب کنید.",
    icon: AddIcon,
  },
  {
    title: "در پنجره باز شده <span>Add</span> را بزنید.",
    icon: IosAddTextIcon,
  },
];
const webList = [
  {
    title: "در نوار آدرس روی آیکون نصب بزنید.",
    icon: InstallDesktopIcon,
  },
  {
    title: "در پنجره بازشده، گزینه <span>Install</span> را انتخاب کنید.",
    icon: InstallIcon,
  },
];

type PropTypes = { open: boolean; onClose: () => void };
export default function PwaModalComponent(props: PropTypes) {
  const items = useMemo(() => {
    const ua = new UAParser().getResult();

    if (ua.os.name?.toLowerCase() === "ios") {
      if (ua.browser.name?.toLowerCase() !== "safari") {
        return [
          {
            title: "در مرورگر سافاری آدرس را باز کنید",
            icon: SafariIcon,
          },
          ...iosList,
        ];
      }
      return iosList;
    }
    if (ua.os.name?.toLowerCase() === "android") {
      if (ua.browser.name?.toLowerCase() !== "chrome") {
        return [
          {
            title: "در مرورگر کروم آدرس را باز کنید",
            icon: ChromeIcon,
          },
          ...androidList,
        ];
      }
      return androidList;
    }
    if (ua.browser.name?.toLowerCase() !== "chrome") {
      return [
        {
          title: "در مرورگر کروم آدرس را باز کنید",
          icon: ChromeIcon,
        },
        ...webList,
      ];
    }
    return webList;
  }, []);
  return <PwaModalView items={items} {...props} />;
}
