export type NetworkBaseType = {
  id: string;
  network: string;
};

export type NetworkType =
  | {
      id: string;
      network: string;
      name: string;
      addressRegex: RegExp;
      tagRegex: undefined;
      hasTag: false;
    }
  | {
      id: string;
      network: string;
      name: string;
      addressRegex: RegExp;
      tagRegex: RegExp;
      hasTag: true;
    };
export interface WalletAddressCoinInterface {
  id: string;
  icon: string;
  faName: string;
  enName: string;
  shortName: string;
  price: number;
  networks: NetworkType[];
}
