import type { NextPage } from "next";
import ContactManagerPage from "@/modules/app-properties/presentation/pages/contact-manager";
import localize from "@/core/localization";
import Head from "next/head";

const ContactManager: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("CONTACT_MANAGER__TITLE")}</title>
        <meta name="description" content={localize("CONTACT_MANAGER__DESC")} />
      </Head>
      <ContactManagerPage />
    </>
  );
};

export default ContactManager;
