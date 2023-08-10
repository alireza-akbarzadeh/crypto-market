import QrCodeView from "./qr-code.view";

type PropTypes = { value: string };
export default function QrCodeComponent(props: PropTypes) {
  return <QrCodeView {...props} />;
}
