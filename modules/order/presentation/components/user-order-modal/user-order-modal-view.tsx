//@React
import {useState} from "react";
// @core
import CustomDialogComponent from "@/core/components/common/custom-dialog"
import LoadingButton from "@/core/components/common/loading-button"
import CustomDropdown from "@/core/components/form/custom-dropdown"
// @Mui
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
// @styles
import styles from "./user-order-modal.module.scss"
import {IconButton, Modal, ToggleButton, ToggleButtonGroup} from "@mui/material";
//@redux
import {useDispatch, useIsMobileSize, useSelector} from "@/core/hooks";
import {exportOrders} from "@/modules/order/presentation/redux";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {Calendar, DayRange} from "react-modern-calendar-datepicker";
import AppDialogComponent from "@/core/components/common/app-dialog";
import CloseIcon from "@mui/icons-material/Close";
import {useSnackbar} from "notistack";

// @Types
type PropTypes = {
    open: boolean;
    onClose: () => void;
};

// @JSX
export default function UserOrderModalView(props: PropTypes) {
    const {open, onClose} = props;

    const  {enqueueSnackbar}=useSnackbar();
    const {entities, error, loading} = useSelector((state) => state.order)
    const [orderType, setOrderType] = useState<string | undefined>();
    const [chooseDate, setChooseDate] = useState<string | null>(null);
    const [format, setFormat] = useState("pdf");
    // const [DataModal, setDataModal] = useState<boolean>(true);
    // const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
    //     from: null,
    //     to: null
    // });
    const dispatch = useDispatch();

    type Option = {
        option: string;
        value: string;
        id: string;
    }
    const option: Option[] | any = [
        {option: "ماه جاری", value: "CurrentMonth"},
        {option: "۳ ماهه", value: "Last3Months"},
        {option: "۶ ماهه", value: "Last6Months"},
        {option: "یک ساله", value: "LastYear"},
        {option: "انتخاب تاریخ دلخواه", value: "DesiredDate"},
    ]
    const handleExportOrder = () => {
        dispatch(exportOrders({type: orderType, format: format, timespan: chooseDate}));
    }

    return (
        <>
        <AppDialogComponent
            open={open}
            onClose={onClose}
            mobileStyle={3}
            // headerClassName="d-none"
            title="ثبت نظر جدید"
        >
                <Box className={styles.root}>
                    <Typography className={""}>
                        دریافت خروجی سفارشات
                    </Typography>
                    <DialogContent className={styles.dilogContent}>
                        <Box className={styles.wrapper}>
                            <CustomDropdown
                                placeholder={"انتخاب تاریخ"}
                                options={option}
                                value={chooseDate}
                                onChange={(e) => setChooseDate(e)}
                                optionRenderer={(item: any) => (
                                    <Typography >
                                        {item.option}
                                    </Typography>
                                )}
                                inputContentRenderer={(item: any) => (
                                    <Typography>
                                        {item.option}
                                    </Typography>
                                )}
                                valueSelector={(item) => item.value}
                            />
                        </Box>

                        <Box className={styles.wrapper}>
                            <Typography className={styles.headsection}>وضعیت سفارش مشخص کنید :</Typography>
                            <ToggleButtonGroup
                                color='standard'
                                fullWidth
                                value={orderType || "all"}
                                exclusive
                                onChange={(_, val) => {
                                    setOrderType(val);
                                }}
                                size='small'
                            >
                                <ToggleButton value={"all"}>همه</ToggleButton>
                                <ToggleButton value={"buy"}>خرید</ToggleButton>
                                <ToggleButton value={"sell"}>فروش</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                        <Box className={styles.wrapper}>
                            <Typography className={styles.headsection}>فرمت فایل خروجی را مشخص کنید :</Typography>
                            <Box className={styles.AlignButton}>
                                <Button size={"large"} onClick={() => setFormat("excel")} fullWidth
                                        variant={"contained"}
                                        className={format === "pdf" ? styles.EXCELBTN : styles.PDFBTN}> EXCEL</Button>
                                <Button size={"large"} fullWidth variant={"contained"} onClick={() => setFormat("pdf")}
                                        className={format === "excel" ? styles.EXCELBTN : styles.PDFBTN}> PDF</Button>
                            </Box>
                        </Box>
                        <Box>
                            <LoadingButton disableElevation={true} onClick={handleExportOrder}
                                           loading={loading === "pending"} disabled={false}
                                           variant={"contained"} color={"primary"} fullWidth>تایید</LoadingButton>
                        </Box>
                    </DialogContent>
                </Box>
            </AppDialogComponent>


        </>
    )
}