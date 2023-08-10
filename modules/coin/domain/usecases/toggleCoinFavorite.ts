import toggleCoinFavoriteDS from "../../data/datasources/coin.datasource";

export default async function toggleCoinFavorite(id: string, remove?: boolean) {
  const { error, success } = await toggleCoinFavoriteDS({
    currency_id: id,
    type: remove ? "remove" : "add",
  });
  return { error, success };
}
