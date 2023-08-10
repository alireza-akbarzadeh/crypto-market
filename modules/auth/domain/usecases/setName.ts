import { AuthSetNameFormValues } from "./../../presentation/components/auth-set-name/auth-set-name.view";
import { NextPage } from "@/core/enums/next-page.enums";
import { setNameDS } from "../../data/datasources/auth.datasource";

type NextPageType = "set_password";
const NextPageMap = {
  set_password: NextPage.SetPassword,
};

export default async function setName(
  { firstName, lastName }: AuthSetNameFormValues,
  token: string
) {
  const { success, result, error } = await setNameDS(
    { first_name: firstName, last_name: lastName },
    token
  );

  if (!success) return { error };

  const { nextPage } = result;
  return {
    data: { nextPage: NextPageMap[nextPage as NextPageType] },
  };
}
