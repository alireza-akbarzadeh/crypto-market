import useUser from "@/modules/auth/domain/usecases/useUser";
import * as Sentry from "@sentry/nextjs";
import { useUpdateEffect } from ".";

export default function useSentry() {
  const { user } = useUser();
  useUpdateEffect(() => {
    if (user) {
      Sentry.setUser({ username: user.phoneNumber });
      return;
    }
    Sentry.configureScope((scope) => scope.setUser(null));
  }, [user]);
}
