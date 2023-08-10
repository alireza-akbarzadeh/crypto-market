import { disconnectTelegramDS } from "../../data/datasources/notifications.datasource";

export default async function disconnectTelegram() {
  const { error, message, success } = await disconnectTelegramDS();
  if (!success) return { error };
  return { data: message };
}
