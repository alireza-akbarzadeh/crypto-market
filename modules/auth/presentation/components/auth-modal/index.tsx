import AuthModalView from "./auth-modal.view";
import { useState } from "react";
import { AuthModalStack } from "../../utils/enums";
import { useDispatch, useSelector } from "@/core/hooks";
import { closeLoginModal } from "../../redux";

export default function AuthModalComponent() {
  const { isLoginModalOpen } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [stack, setStack] = useState<AuthModalStack[]>([]);

  const onPush = (route: AuthModalStack) => {
    setStack((s) => [route, ...s]);
  };
  const onReplace = (route: AuthModalStack) => {
    const newStack = [...stack];
    if (stack.length) {
      newStack.shift();
    }
    setStack([route, ...newStack]);
  };
  const onReset = () => {
    setStack([]);
  };
  const handleClose = () => {
    dispatch(closeLoginModal());
    onReset();
  };
  const onBack = () => {
    if (!stack.length) {
      return handleClose();
    }
    setStack(stack.slice(1, stack.length));
  };

  return (
    <AuthModalView
      current={stack[0]}
      {...{
        open: isLoginModalOpen,
        onClose: handleClose,
        onBack,
        onPush,
        onReplace,
        onReset,
      }}
    />
  );
}
