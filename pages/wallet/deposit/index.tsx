import type { NextPage } from "next";
import PaymentPage from "@/modules/order/presentation/pages/payment";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useNotFound } from "@/core/hooks";
import Head from "next/head";
import { themeLight } from "@/core/theme";

const Payment: NextPage = () => {
  const router = useRouter();
  const { token, status } = router.query;
  const toNotFound = useNotFound();
  const invalidQuery =
    typeof token !== "string" || !(status === "0" || status === "1");

  useEffect(() => {
    if (!router.isReady) return;
    if (invalidQuery) {
      toNotFound();
    }
  }, [router.query]);

  if (invalidQuery) return null;
  return (
    <>
      <Head>
        {status ? (
          <meta
            name="theme-color"
            content={
              themeLight.palette[status === "1" ? "success" : "error"].main
            }
          />
        ) : null}
      </Head>
      <PaymentPage {...({ token, status: +(status as any) } as any)} />
    </>
  );
};
export default Payment;
