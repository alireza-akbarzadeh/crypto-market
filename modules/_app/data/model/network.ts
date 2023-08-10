import { NetworkType } from "./../../../wallet/domain/entities/coin";

export default function networkModelMapper(data: any = {}): NetworkType {
  const { network, name, addressRegex, tagRegex, hasTag, id } = data;
  return {
    id,
    network,
    name,
    addressRegex: new RegExp(addressRegex),
    tagRegex: tagRegex ? new RegExp(tagRegex) : undefined,
    hasTag,
  };
}
