import {
  useCrisp,
  useDispatch,
  useErrorHandler,
  useSelector,
} from "@/core/hooks";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { openLoginModal } from "@/modules/auth/presentation/redux";
import {
  TicketCategoryInterface,
  TicketFormValues,
} from "@/modules/support/domain/entities/ticket";
import createTicket from "@/modules/support/domain/usecases/createTicket";
import useTickets from "@/modules/support/domain/usecases/useTickets";
import useAppInitials from "@/modules/_app/domain/usecases/useAppInitials";
import { openAlert } from "@/modules/_app/presentation/redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { closeSupport } from "../../redux";
import SupportContentView, { SupportStack } from "./support-content.view";

type PropTypes = {};
export default function SupportContentComponent(props: PropTypes) {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { supportInitialStack } = useSelector((s) => s.support);
  const [stack, setStack] = useState<SupportStack[]>([]);
  const [ticketCategory, setTicketCategory] =
    useState<TicketCategoryInterface>();
  const [ticketOpen, setTicketOpen] = useState(false);
  const crisp = useCrisp();
  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();
  const ticketList = useTickets(undefined, false);
  const { data: appInitials } = useAppInitials();

  useEffect(() => {
    if (supportInitialStack) {
      setTicketCategory({
        description:
          "در صورت مشاهده باگ یا نقص عملکرد،‌ می‌توانید با گزارش در این فرم ما را در حفظ امنیت معاملات و اطلاعات کاربران یاری کنید.",
        id: "64",
        orderRequired: false,
        title: "گزارش باگ یا خطای امنیتی",
      });
    }
    setStack(supportInitialStack || []);
  }, [supportInitialStack]);

  const onClose = () => {
    if (typeof window !== "undefined") {
      window!.top?.postMessage?.("closeSupportModal", "*");
    }
    dispatch(closeSupport());
  };

  const onPush = (route: SupportStack) => {
    setStack((s) => [route, ...s]);
  };
  const onBack = (levels = 1) => {
    if (typeof levels !== "number") levels = 1;
    if (ticketOpen) return setTicketOpen(false);

    setStack((s) => s.slice(levels, s.length));
    if (ticketCategory) {
      setTimeout(() => {
        setTicketCategory(undefined);
      }, 200);
    }
  };
  const openNewTicket = () => {
    if (!user) {
      return dispatch(openLoginModal());
    }
    onPush(SupportStack.NewTicket);
  };
  const openMyTickets = () => {
    if (!user) {
      return dispatch(openLoginModal());
    }
    onPush(SupportStack.MyTickets);
  };
  const handleCategorySelect = (c: TicketCategoryInterface) => {
    setTicketCategory(c);
    onPush(SupportStack.ComposeTicket);
  };

  const handleTicketSubmit = async (values: TicketFormValues) => {
    values.categoryId = ticketCategory?.id;
    const { error, message } = await createTicket(values);
    if (error) {
      errorHandler(error);
      return;
    }
    ticketList.mutate();
    enqueueSnackbar(message, { variant: "success" });
    onBack(2);
    onPush(SupportStack.MyTickets);
  };
  const handleOpenCrisp = () => {
    if (appInitials?.crisp.enable) {
      return crisp.open();
    }
    dispatch(
      openAlert({
        message: appInitials?.crisp.description,
        actionButtons: [
          {
            title: "متوجه شدم",
            variant: "contained",
            handler: (close: any) => {
              close();
            },
          },
        ],
      })
    );
  };
  return (
    <SupportContentView
      {...{
        stack,
        openNewTicket,
        openMyTickets,
        onBack,
        onPush,
        onClose,
        user,
        handleCategorySelect,
        ticketCategory,
        ticketOpen,
        openCrisp: handleOpenCrisp,
        crispDisabled: !crisp.initialized,
        crispOpen: crisp.isOpen,
        appInitials,
        handleTicketSubmit,
        openTicket: () => setTicketOpen(true),
      }}
    />
  );
}
