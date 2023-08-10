import { deleteAlertDS } from "../../data/datasources/notifications.datasource";

export default async function deleteAlert(id: string) {
  const { error, success, message } = await deleteAlertDS(id);
  if (!success) return { error };
  return { data: message };
}
