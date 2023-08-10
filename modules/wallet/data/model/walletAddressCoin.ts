import networkModelMapper from "@/modules/_app/data/model/network";

export default function walletAddressCoinModelMapper(data: any) {
  const { icon, faName, enName, coin, price, networks, id } = data;
  return {
    id,
    icon,
    faName,
    enName,
    shortName: coin,
    price,
    networks: networks.map(networkModelMapper),
  };
}
