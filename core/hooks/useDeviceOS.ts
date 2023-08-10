export default function useDeviceOS() {
  if (typeof window === "undefined") return "other";
  const { userAgent } = window.navigator;

  if (userAgent.indexOf("Win") !== -1) return "windows";
  if (userAgent.indexOf("Mac") !== -1) return "mac";
  if (userAgent.indexOf("X11") !== -1) return "unix";
  if (userAgent.indexOf("Linux") !== -1) return "linux";

  return "other";
}
