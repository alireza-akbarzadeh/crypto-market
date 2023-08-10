import UnauthenticatedContentView from "./unauthenticated-content.view";
import { useDispatch } from "@/core/hooks";
import { openLoginModal } from "@/modules/auth/presentation/redux";
import { useEffect } from "react";
import useUser from "@/modules/auth/domain/usecases/useUser";
import LoadingComponent from "@/core/components/common/loading";

type PropTypes = {
  title: string;
  children?: any;
  image?: any;
  backHref?: string;
};
export default function UnauthenticatedContentComponent(props: PropTypes) {
  const dispatch = useDispatch();
  const { userLoading } = useUser();

  useEffect(() => {
    if (!userLoading) dispatch(openLoginModal());
  }, [userLoading]);

  if (userLoading) return <LoadingComponent fullScreen />;
  return (
    <UnauthenticatedContentView
      openLoginModal={() => dispatch(openLoginModal())}
      {...props}
    />
  );
}
