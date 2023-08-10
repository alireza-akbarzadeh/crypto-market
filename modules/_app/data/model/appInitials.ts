import { KycStatus } from "@/core/enums/kyc.enums";
import { AppInitialsInterface } from "./../../domain/entities/appInitials";

function StatusMap(type: "unConfirmed" | "confirmed" | "rejected" | "pending") {
  switch (type) {
    case "confirmed":
      return KycStatus.Accepted;
    case "unConfirmed":
      return KycStatus.NotAccepted;
    case "rejected":
      return KycStatus.Rejected;
    default:
      return KycStatus.Pending;
  }
}
export default function appInitialsModelMapper(
  data?: any
): AppInitialsInterface | undefined {
  if (!data) return;
  const {
    logo,
    currencyCount,
    bitgapUserOnline,
    announcement,
    user,
    crisp,
    kycShortcut,
    filters,
  } = data;
  return {
    logo: {
      image: logo.image,
      title: logo.title,
    },
    currencyCount,
    bitgapUserOnline,
    announcement: {
      title: announcement.title,
      link: announcement.link,
      enable: announcement.enable,
      updatedAt: announcement.updatedAt * 1000,
    },
    kycShortcut: {
      description: kycShortcut.description,
      enable: kycShortcut.enable,
    },
    user: {
      availableBalance: user.availableBalance,
      kycStatus: StatusMap(user.kycStatus),
    },
    crisp: { enable: crisp.enable, description: crisp.description },
    filters: {
      livePrice: filters.livePrice.map(({ title, id }: any) => ({ id, title })),
      orders: filters.orders.map(({ title, id }: any) => ({ id, title })),
    },
  };
}
