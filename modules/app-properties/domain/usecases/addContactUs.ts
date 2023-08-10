import { addContactUsDS } from "../../data/datasources/app-properties.datasource";
import { UserCommentsFormValues } from "./../entities/form-values";

export default async function addContactUs(model: UserCommentsFormValues) {
  const { message, error } = await addContactUsDS({
    body: model.message,
  });
  if (error) {
    return { error };
  }
  return {
    data: message,
  };
}
