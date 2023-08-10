import { KycStatus } from "@/core/enums/kyc.enums";
import { OrderStatus } from "@/modules/order/domain/entities/order";
export interface AppInitialsInterface {
  logo: {
    image: string;
    title: string;
  };
  currencyCount: number;
  bitgapUserOnline: number;
  announcement: {
    link: string;
    title: string;
    enable: boolean;
    updatedAt: number;
  };
  kycShortcut: {
    description: string;
    enable: boolean;
  };

  crisp: { enable: boolean; description: string };
  user: { availableBalance: number; kycStatus: KycStatus };

  filters: {
    livePrice: LivePriceSortOption[];
    orders: OrderStatus[];
  };
}
export interface LivePriceSortOption {
  id: string;
  title: string;
}
