export default function walletBalanceModelMapper(data: any) {
  const { available } = data;
  return {
    available,
  };
}
