import { NetworkBaseType } from "@/modules/wallet/domain/entities/coin";
import NetworkSelectView from "./network-select.view";

export type NetworkSelectProps<T> = {
  options: T[];
  value?: T;
  error?: string;
  onChange: (network: T) => void;
  className?: string;
};
export default function NetworkSelectComponent<T extends NetworkBaseType = any>(
  props: NetworkSelectProps<T>
) {
  return <NetworkSelectView {...props} />;
}
