import OrdersView, {FilterType} from "./orders.view";
import {useState} from "react";
import {
    OrderInterface,
    OrderStatus,
} from "@/modules/order/domain/entities/order";
import {OrderType} from "@/core/enums/order.enums";
import useUser from "@/modules/auth/domain/usecases/useUser";
import OrderFilterModalComponent from "../../components/order-filter-modal";
import useAppInitials from "@/modules/_app/domain/usecases/useAppInitials";

type PropTypes = {};
export default function OrdersPage(props: PropTypes) {
    const [state, setState] = useState<OrderStatus["id"][]>([]);
    const [orderModalData, setOrderModalData] = useState<OrderInterface>();
    const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
    const {user, userLoading} = useUser();
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [filterModalType, setFilterModalType] = useState<FilterType>();
    const [orderType, setOrderType] = useState<OrderType>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {data: appInitials} = useAppInitials();

    const openOrderModal = (item: OrderInterface) => {
        setOrderModalData(item);
        setOrderModalOpen(true);
    };
    const closeOrderModal = () => {
        setOrderModalOpen(false);
    };
    const onFilterChange = (status: OrderStatus["id"][], type?: OrderType) => {
        setState(status);
        setOrderType(type);
    };
    const removeStatus = (e: any, status: OrderStatus["id"]) => {
        e.stopPropagation();
        setState((list) => list.filter((s) => status !== s));
    };
    const removeType = (e: any) => {
        e.stopPropagation();
        setOrderType(undefined);
    };
    const openFilterModal = (type?: FilterType) => {
        setFilterModalOpen(true);
        setFilterModalType(type);
    };

    const closeUserOrderModal = () => {
        setIsOpen(false)
    }
    const openUserOrderModal = () => {
        setIsOpen(true)

    }

    return (
        <>
            <OrdersView
                {...{
                    state,
                    setState: (s) => setState(s),
                    openOrderModal,
                    closeOrderModal,
                    closeUserOrderModal,
                    openUserOrderModal,
                    orderModalOpen,
                    orderModalData,
                    userLoading,
                    user,
                    openFilterModal,
                    removeStatus,
                    isOpen,
                    orderType,
                    setOrderType,
                    removeType,
                    orderStatus: appInitials?.filters.orders || [],
                }}
            />
            <OrderFilterModalComponent
                open={filterModalOpen}
                onClose={() => setFilterModalOpen(false)}
                orderStatus={state}
                orderType={orderType}
                onChange={onFilterChange}
                filterType={filterModalType}
            />
        </>
    );
}
