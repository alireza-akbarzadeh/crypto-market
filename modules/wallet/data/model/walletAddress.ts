export default function walletAddressModelMapper(data: any) {
  const { address, currency, id, name, tag, network } = data;
  return {
    image: currency.icon,
    id,
    address,
    tag,
    network: network?.network,
    networkName: network?.name,
    faName: currency.faName,
    color: currency.color,
    label: name,
  };
}
