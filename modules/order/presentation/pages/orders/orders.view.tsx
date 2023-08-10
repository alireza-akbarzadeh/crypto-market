import styles from "./orders.module.scss";
import {
    BottomNavigation,
    Box,
    Button,
    ButtonBase,
    Container,
    Grid,
    Tab,
    Tabs,
    ToggleButton,
    ToggleButtonGroup,
    Toolbar,
    Typography
} from "@mui/material";
import {OrderType} from "@/core/enums/order.enums";
import AppHeader from "@/core/components/layouts/app-header";
import {OrderInterface, OrderStatus,} from "@/modules/order/domain/entities/order";
import OrderDetailsModalComponent from "../../components/order-details-modal";
import OrderListComponent from "../../components/order-list";
import UserOrderModalComponent from "../../components/user-order-modal";
import {UserInterface} from "@/modules/auth/domain/entities/user";
import UnauthenticatedContentComponent from "@/core/components/layouts/unauthenticated-content";
import {FilterIcon} from "@/core/components/common/custom-icon";
import CloseIcon from "@mui/icons-material/Cancel";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import clsx from "clsx";
import AppBottomNavComponent from "@/core/components/layouts/app-bottom-nav";
import Link from "next/link";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {useSnackbar} from "notistack";
import PieChartIcon from '@mui/icons-material/PieChart';
import {useIsMobileSize} from "@/core/hooks";
import {useRouter} from "next/router";

export enum FilterType {
    Type = "Type",
    Status = "Status",
}

type PropTypes = {
    state: OrderStatus["id"][];
    orderStatus: OrderStatus[];
    setState: (state: OrderStatus["id"][]) => void;
    removeStatus: (e: any, status: OrderStatus["id"]) => void;
    openOrderModal: (data: OrderInterface) => void;
    closeOrderModal: () => void;
    openUserOrderModal: () => void;
    orderModalOpen: boolean;
    closeUserOrderModal: () => void;
    orderModalData?: OrderInterface;
    userLoading: boolean;
    user?: UserInterface;
    openFilterModal: (type?: FilterType) => void;
    orderType?: OrderType;
    setOrderType: (type?: OrderType) => void;
    removeType: (e: any) => void;
    isOpen: boolean;
};
export default function OrdersView(props: PropTypes) {
    const {
        state,
        setState,
        openOrderModal,
        closeOrderModal,
        closeUserOrderModal,
        orderModalOpen,
        orderModalData,
        userLoading,
        openUserOrderModal,
        isOpen,
        user,
        openFilterModal,
        removeStatus,
        orderType,
        setOrderType,
        removeType,
        orderStatus,
    } = props;
    const  {enqueueSnackbar}=useSnackbar();
    const router = useRouter();
    const isMobileSize = useIsMobileSize();
    if (!user)
        return (
            <>
                <UnauthenticatedContentComponent title='سفارشات' backHref='/'>
                    در این بخش می‌توانید وضعیت سفارشات خود را مشاهده کنید.
                </UnauthenticatedContentComponent>
                <AppBottomNavComponent/>
            </>
        )
    const handleOpenSnackBar =()=>{
        enqueueSnackbar("این ویژگی  به زودی در دسترس خواهد بود ", { variant: "info" });
    }

    const isActive=state.length ||   orderType === OrderType.Sell|| orderType === OrderType.Buy;
    return (
        <Box bgcolor='background.secondary' className={styles.root}>
            <div className='mobile-down'>
                <AppHeader
                    bgcolor='background.paper'
                    backHref='/'
                    title='سفارشات'
                    // toolbarContent={<SupportButtonComponent sx={{ ml: "auto" }} />}
                >
                    {/*<div className={styles.scrollable}>*/}
                    {/*    <div className={styles.chipsContainer}>*/}
                    {/*        <ButtonBase*/}
                    {/*            onClick={() => openFilterModal()}*/}
                    {/*            className={styles.chip}*/}
                    {/*        >*/}
                    {/*            <FilterIcon className={styles.icon}/>*/}
                    {/*            <Typography component='span'> فیلتر</Typography>*/}
                    {/*        </ButtonBase>*/}
                    {/*        {orderType ? (*/}
                    {/*            <ButtonBase*/}
                    {/*                className={clsx(styles.chip, styles.primary)}*/}
                    {/*                onClick={() => openFilterModal(FilterType.Type)}*/}
                    {/*            >*/}
                    {/*                <CloseIcon*/}
                    {/*                    onClick={removeType}*/}
                    {/*                    className={styles.icon}*/}
                    {/*                    fontSize='small'*/}
                    {/*                />*/}
                    {/*                <Typography component='span'>*/}
                    {/*                    {orderType === OrderType.Buy ? "خرید" : "فروش"}*/}
                    {/*                </Typography>*/}
                    {/*            </ButtonBase>*/}
                    {/*        ) : (*/}
                    {/*            <ButtonBase*/}
                    {/*                onClick={() => openFilterModal(FilterType.Type)}*/}
                    {/*                className={styles.chip}*/}
                    {/*            >*/}
                    {/*                <Typography component='span'>نوع</Typography>*/}
                    {/*            </ButtonBase>*/}
                    {/*        )}*/}
                    {/*        {state.length ? (*/}
                    {/*            state.map((id) => {*/}
                    {/*                const s = orderStatus.find((o) => o.id === id);*/}
                    {/*                if (!s) return null;*/}
                    {/*                return (*/}
                    {/*                    <ButtonBase*/}
                    {/*                        key={s.id}*/}
                    {/*                        className={clsx(styles.chip, styles.primary)}*/}
                    {/*                        onClick={() => openFilterModal(FilterType.Status)}*/}
                    {/*                    >*/}
                    {/*                        <CloseIcon*/}
                    {/*                            onClick={(e) => removeStatus(e, s.id)}*/}
                    {/*                            className={styles.icon}*/}
                    {/*                            fontSize='small'*/}
                    {/*                        />*/}
                    {/*                        <Typography component='span'>{s.title}</Typography>*/}
                    {/*                    </ButtonBase>*/}
                    {/*                );*/}
                    {/*            })*/}
                    {/*        ) : (*/}
                    {/*            <ButtonBase*/}
                    {/*                onClick={() => openFilterModal(FilterType.Status)}*/}
                    {/*                className={styles.chip}*/}
                    {/*            >*/}
                    {/*                <Typography component='span'>وضعیت</Typography>*/}
                    {/*            </ButtonBase>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </AppHeader>
                <Toolbar sx={{zIndex: -1}}/>
            </div>
            <div className='mobile-up'>
                <AppHeader bgcolor='background.secondary'/>
            </div>
            <Container>
                {isMobileSize && (
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between", mt:-4.5}}>
                        <Button
                            sx={{padding: "10px 19px !important"}}
                            variant={"outlined"}
                            color={isActive  ? "primary"  : "secondary"}
                            onClick={() => openFilterModal()}
                        >
                            <FilterIcon sx={{color:isActive  ? "primary"  : "text.primary"}} />
                            <Typography sx={{color:isActive  ? "primary"  : "text.primary"}} component='span'> فیلتر</Typography>
                        </Button>
                        <Box sx={{display: "flex" , gap:1}}>
                            <Button
                                sx={{padding: "10px 12px !important"}}
                                variant={"outlined"}
                                color={"secondary"}
                                onClick={() =>router.push("/orders/overview")}
                            >
                                <PieChartIcon sx={{color:"text.primary"}}  />

                            </Button>
                            <Button
                                sx={{padding: "10px 12px !important"}}
                                size={"medium"}
                                variant={"outlined"}
                                color={"secondary"}
                                onClick={handleOpenSnackBar}
                            >
                                    <FileDownloadIcon sx={{color:"text.primary"}} />
                            </Button>
                        </Box>
                    </Box>
                )}
                <div className={styles.paper}>
                    <div className='mobile-up'>
                        <Box className={styles.controlBar}>
                            <Typography
                                className={styles.title}
                                component='h2'
                                variant='h4'
                                fontWeight={700}
                            >
                                سفارشات
                            </Typography>
                            <div className={styles.orderLink}>
                                <Typography className={styles.downloadOrder} onClick={handleOpenSnackBar}>
                                    دانلود خروجی سفارشات
                                    <DownloadIcon/>
                                </Typography>
                                <Link href={"/orders/overview"}>
                                    <Typography className={styles.downloadOrder}>
                                        نمای کلی سفارشات
                                        <ArrowBackIcon/>
                                    </Typography>
                                </Link>
                            </div>
                        </Box>
                        <Grid container spacing={4}>
                            <Grid item xs={8}>
                                <Tabs
                                    value={state[0] || "all"}
                                    onChange={(_, v) => {
                                        if (v === "all") return setState([]);
                                        setState([v]);
                                    }}
                                    variant='scrollable'
                                >
                                    <Tab value={"all"} label='همه'/>
                                    {orderStatus.map(({id, title}) => (
                                        <Tab key={id} value={id} label={title}/>
                                    ))}
                                </Tabs>
                            </Grid>
                            <Grid item xs={4}>
                                <ToggleButtonGroup
                                    color='standard'
                                    fullWidth
                                    value={orderType || "all"}
                                    exclusive
                                    onChange={(_, val) => {
                                        if (val === "all") setOrderType(undefined);
                                        setOrderType(val !== null ? val : orderType);
                                    }}
                                    size='small'
                                    // sx={{ border: "none" }}
                                >
                                    <ToggleButton value={"all"}>همه</ToggleButton>
                                    <ToggleButton value={OrderType.Buy}>خرید</ToggleButton>
                                    <ToggleButton value={OrderType.Sell}>فروش</ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        </Grid>
                    </div>
                    <OrderListComponent
                        openOrderModal={openOrderModal}
                        status={state}
                        type={orderType}
                    />
                </div>
            </Container>
            <UserOrderModalComponent open={isOpen} onClose={closeUserOrderModal}/>
            <OrderDetailsModalComponent
                open={orderModalOpen}
                onClose={closeOrderModal}
                data={orderModalData}
            />
            <BottomNavigation sx={{opacity: 0, zIndex: -1}}/>
            <AppBottomNavComponent/>
        </Box>
    );
}
