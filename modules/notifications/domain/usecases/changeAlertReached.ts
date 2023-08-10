import { changeAlertReachedDS } from "../../data/datasources/notifications.datasource";

export default async function changeAlertReached(id: string, reached: boolean) {
  const { result, error, success } = await changeAlertReachedDS({
    alert_id: id,
    status: reached,
  });
  if (!success) return { error };
  return { data: result };
}
