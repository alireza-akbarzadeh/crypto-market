import { connectTelegramDS } from "../../data/datasources/notifications.datasource";

export default async function connectTelegram(chatId: string) {
  const { message, error, success } = await connectTelegramDS(chatId);
  if (!success) return { error };
  return { data: message };
}
