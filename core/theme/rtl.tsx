import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

export default function createRtlCache() {
  return createCache({
    key: "muirtl",
    prepend: true,
    stylisPlugins: [rtlPlugin as any],
  });
}
