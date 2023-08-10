import { useDispatch } from "@/core/hooks";
import {
  setCachedLogo,
  setDeviceId,
  setToken,
} from "@/modules/auth/presentation/redux";
import { setTheme } from "@/modules/_app/presentation/redux";
import axios from "axios";
import { useEffect } from "react";
import { v4 as uuid4 } from "uuid";
import jwtDecode from "jwt-decode";
import { getLocalStorageToken } from "../helpers";

function getLocalStorageItems() {
  const logo = localStorage.getItem("logo");
  return {
    theme: localStorage.getItem("theme"),
    token: getLocalStorageToken(),
    deviceId: localStorage.getItem("deviceId"),
    logo: logo ? JSON.parse(logo) : undefined,
  };
}
export default function useLocalStorageData() {
  const dispatch = useDispatch();
  useEffect(() => {
    let { theme, token, deviceId, logo } = getLocalStorageItems();

    if (!deviceId) {
      deviceId = "W" + uuid4();
      localStorage.setItem("deviceId", deviceId);
    }

    const deviceDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (!theme && deviceDark) {
      theme = "dark";
    }
    if (token) dispatch(setToken(token));
    if (theme) dispatch(setTheme(theme));
    if (deviceId) dispatch(setDeviceId(deviceId));
    if (logo) dispatch(setCachedLogo(logo));

    if (window) {
      window.onstorage = () => {
        const { theme, token, deviceId, logo } = getLocalStorageItems();
        dispatch(setToken(token));
        dispatch(setTheme(theme));
        dispatch(setDeviceId(deviceId));
        dispatch(setCachedLogo(logo));
      };
    }
    return () => {
      window.onstorage = null;
    };
  }, []);
}
