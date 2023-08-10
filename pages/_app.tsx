import "@/core/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "@/core/redux";
import MyApp from "@/modules/_app/presentation/pages/app";
import { themeLight, themeDark } from "@/core/theme";
import { useSelector } from "@/core/hooks";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/core/theme/emotionCache";
import createRtlCache from "@/core/theme/rtl";
import localize from "@/core/localization";

const clientSideEmotionCache = createEmotionCache();
const clientSideRtlCache = createRtlCache();

type PropTypes = AppProps & {
  emotionCache?: EmotionCache;
  rtlCache?: EmotionCache;
};
export default function Root(props: PropTypes) {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
}
function App(props: PropTypes) {
  const { isDarkTheme } = useSelector((state) => state.app);

  return (
    <CacheProvider value={props.emotionCache || clientSideEmotionCache}>
      <CacheProvider value={props.rtlCache || clientSideRtlCache}>
        <Head>
          <title>{localize("APP__TITLE")}</title>
          <meta name="description" content={localize("APP__DESC")} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <meta
            name="theme-color"
            content={
              (isDarkTheme ? themeDark : themeLight).palette.background.default
            }
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MyApp {...props} />
      </CacheProvider>
    </CacheProvider>
  );
}
