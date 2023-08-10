import BugReportView from "./bug-report.view";
import { useDispatch } from "@/core/hooks";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { openLoginModal } from "@/modules/auth/presentation/redux";
import { openSupport } from "@/modules/support/presentation/redux";

type PropTypes = {};
export default function BugReportPage(props: PropTypes) {
  const dispatch = useDispatch();
  const { user, userLoading } = useUser();
  return (
    <BugReportView
      {...{
        user,
        userLoading,
        openLoginModal: () => dispatch(openLoginModal()),
        openReport: () => dispatch(openSupport([4, 2, 1])),
      }}
    />
  );
}
