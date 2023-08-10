import SupportContentComponent from "../../components/support-content";
import styles from "./support.module.scss";

type PropTypes = {};
export default function SupportView(props: PropTypes) {
  return (
    <div className={styles.root}>
      <SupportContentComponent />
    </div>
  );
}
