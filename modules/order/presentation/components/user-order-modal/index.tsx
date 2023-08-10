import React from 'react';
import UserOrderModalView from "@/modules/order/presentation/components/user-order-modal/user-order-modal-view";

type PropTypes = {
    open: boolean;
    onClose: () => void;

};


const UserOrderModalComponent = (props: PropTypes) => {
    const {open, onClose} = props;
    return (
        <UserOrderModalView  {...{open, onClose,}}  />
    );
};

export default UserOrderModalComponent;
