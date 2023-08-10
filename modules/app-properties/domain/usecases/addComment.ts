import { addCommentDS } from "../../data/datasources/app-properties.datasource";
import { UserCommentsFormValues } from "./../entities/form-values";

export default async function addComment(model: UserCommentsFormValues) {
  const { message, error } = await addCommentDS({
    body: model.message,
  });
  if (error) {
    return { error };
  }
  return {
    data: message,
  };
}
