import { profileUpdateDS } from "../../data/datasources/profile.datasource";
import { UserInfoFormValues } from "../entities/form-values";

export default async function profileUpdate(values: UserInfoFormValues) {
  const { result, message, error } = await profileUpdateDS({
    birthDay: values.birthDate,
    fatherName: values.fatherName,
    nationalCode: values.nationalCode,
  });
  if (error) {
    return { error };
  }
  return { data: result, message };
}
