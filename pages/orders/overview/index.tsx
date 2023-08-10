import type { NextPage } from "next";
import localize from "@/core/localization";
import Head from "next/head";
import OrdersOverviewPage from "@/modules/order/presentation/pages/orders-overview";

const Orders: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("ORDERS__TITLE")}</title>
        <meta name="description" content={localize("ORDERS__DESC")} />
      </Head>
      <OrdersOverviewPage />
    </>
  );
};

export default Orders;
