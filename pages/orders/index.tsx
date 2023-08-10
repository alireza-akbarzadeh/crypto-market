import type { NextPage } from "next";
import OrdersPage from "@/modules/order/presentation/pages/orders";
import localize from "@/core/localization";
import Head from "next/head";

const Orders: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("ORDERS__TITLE")}</title>
        <meta name="description" content={localize("ORDERS__DESC")} />
      </Head>
      <OrdersPage />
    </>
  );
};

export default Orders;
