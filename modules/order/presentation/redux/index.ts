import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import http from "@/core/http";

interface ExportOrders {
    type: string | null | undefined;
    timespan: string | null;
    format: string;
}

export const exportOrders = createAsyncThunk("order", async ({type, timespan, format}: ExportOrders) => {
    let order = type === "all" ? null : type
    const res: any = await http.get(`/report/orderReport/export`, {
        params: {
            type: order,
            format: format,
            timespan: timespan,
        }
    })
    console.log(res, "resresresres")
    return res
})

interface OrderState {
    invoiceModalData: any;
    invoiceModalOpen: boolean;
    loading: string;
    entities: any,
    error: any;


}

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        invoiceModalData: undefined,
        invoiceModalOpen: false,
        loading: "idle",
        entities: [],
    } as OrderState,
    reducers: {
        openInvoiceModal: (state, {payload}) => {
            state.invoiceModalOpen = true;
            state.invoiceModalData = payload;
        },
        updateInvoiceModal: (state, {payload}) => {
            state.invoiceModalData = {...state.invoiceModalData, ...payload};
        },
        closeInvoiceModal: (state) => {
            state.invoiceModalOpen = false;
            // state.invoiceModalData = undefined;
        },
    },
    extraReducers: builder => builder.addCase(exportOrders.pending, (state, action) => {
        state.loading = "pending"
    }).addCase(exportOrders.fulfilled, (state, action) => {
        state.loading = "success";
        const res= action.payload;
        const link = document?.createElement('a');
        link.href = res?.result?.downloadUrl;
        link.target = "_blank"
        link.click();
    }).addCase(exportOrders.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload
    })
});

export const {openInvoiceModal, closeInvoiceModal, updateInvoiceModal} =
    orderSlice.actions;

export default orderSlice.reducer;
