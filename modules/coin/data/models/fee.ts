import { CoinFeeInterface } from "../../domain/entities/coin";

export default function FeeModelMapper(data: any): CoinFeeInterface {
  const { id, icon, faName, enName, coin, networks } = data;
  return {
    currency: {
      icon,
      faName,
      enName,
      shortName: coin,
    },
    fees: networks.map(({ network, fee, coinFee }: any) => ({
      network,
      fee,
      coinFee,
    })),
  };
}
// "id": 53,
// "icon": "https://api.crypto.dev/static/coins/BTC.png",
// "faName": "بیت کوین",
// "enName": "Bitcoin",
// "coin": "BTC",
// "networks": [
//     {
//         "network": "BTC",
//         "id": 16,
//         "name": "Bitcoin",
//         "addressRegex": "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^(bc1)[0-9A-Za-z]{39,59}$",
//         "tagRegex": null,
//         "hasTag": false,
//         "fee": 845077
//     }
// ]
