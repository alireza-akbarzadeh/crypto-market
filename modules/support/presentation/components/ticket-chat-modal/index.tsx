import {
  useDeepCompareEffect,
  useErrorHandler,
  usePaginateHelpers,
} from "@/core/hooks";
import { TicketChatItemInterface } from "@/modules/support/domain/entities/ticket";
import createTicket from "@/modules/support/domain/usecases/createTicket";
import useTicketChat from "@/modules/support/domain/usecases/useTicketChat";
import { useEffect, useMemo, useState } from "react";
import TicketChatModalView from "./ticket-chat-modal.view";

type PropTypes = { open: boolean; ticketId?: string };

export default function TicketChatModalComponent(props: PropTypes) {
  const { open, ticketId } = props;
  const [pendingMessages, setPendingMessages] = useState<
    TicketChatItemInterface[]
  >([]);
  const { isLoading, meta, setSize, rows, mutate } = usePaginateHelpers(
    useTicketChat,
    20,
    {
      id: ticketId,
    }
  );
  const rowsWithDate: (TicketChatItemInterface | string)[] = useMemo(() => {
    let datesCount = 0;
    const res = rows.reduce((prev, n, i) => {
      i += datesCount;
      if (!i || (typeof prev[i - 1] !== "string" && prev[i - 1].day === n.day))
        return [...prev, n];
      datesCount++;
      return [...prev, prev[i - 1].day, n];
    }, [] as any);
    if (res[res.length - 1]) res.push(res[res.length - 1].day);
    return res;
  }, [rows]);
  const [message, setMessage] = useState("");
  const [imagePrev, setImagePrev] = useState<any>();
  const [imageFile, setImageFile] = useState<File>();
  const errorHandler = useErrorHandler();

  useDeepCompareEffect(() => {
    setPendingMessages([]);
  }, [rows]);

  const onFileSelect = (e: any) => {
    const file = e?.target?.files[0];
    if (!file) {
      setImagePrev(undefined);
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setImagePrev([reader.result]);
    };
  };

  const onSend = (e: any) => {
    if (e.key && e.key !== "Enter") return;

    const _message = message.trim();
    if (!_message.length) return;
    // TODO: generate new id
    const _id = "ID" + Date.now();
    // add image
    sendMessage({ description: _message, file: imageFile });
    setPendingMessages((d) => [
      { message: _message, id: _id, image: imagePrev, owner: true },
      ...d,
    ]);

    setMessage("");
    setImageFile(undefined);
    setImagePrev(undefined);
  };
  const sendMessage = async (values: any) => {
    const { error } = await createTicket({ ...values, parentId: ticketId });
    if (error) {
      errorHandler(error);
      return;
    }
    mutate();
  };
  const handleScroll = (e: any) => {
    if (!e?.target) return;
    const { scrollHeight, scrollTop, offsetHeight } = e.target;
    const scrollBottom = scrollHeight + scrollTop - offsetHeight;
    if (isLoading || scrollBottom > 60 || !meta) return;

    const { currentPage, lastPage } = meta.paginateHelper;
    if (currentPage >= lastPage) return;

    setSize(currentPage + 1);
  };
  return (
    <TicketChatModalView
      {...{
        open,
        message,
        setMessage,
        onSend,
        onFileSelect,
        imagePrev,
        handleScroll,
        rows: [...pendingMessages, ...rowsWithDate],
      }}
    />
  );
}
