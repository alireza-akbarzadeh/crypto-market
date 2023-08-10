import FA from "./fa.json";

type Variables = {
  [key: string]: string;
};
export default function localize(key: keyof typeof FA, variables?: Variables) {
  const tr = FA[key];
  if (!variables) return tr;

  return Object.entries(variables).reduce((prev, [_key, _value]) => {
    return prev.replace(new RegExp(`{{${_key}}}`, "g"), _value);
  }, tr);
}
