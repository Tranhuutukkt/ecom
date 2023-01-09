import React, {useState} from "react";
import {Modal} from "@/components/common";
import PropType from "prop-types";
import OrderItem from "@/views/account/components/user-orders/OrderItem";
import {displayMoney} from "@/helpers/utils";

const statusDetails = [
    {msg: 'Canceled', color: "burlywood"},
    {msg: 'Confirming', color: "aquamarine"},
    {msg: 'Confirmed', color: "lawngreen"},
    {msg: 'Delivering', color: "lavenderblush"},
    {msg: 'Successfully', color: "lightskyblue"},
    {msg: 'Failed', color: "lightcoral"}
];

const total = (product) => {
    let total = 0;
    product.map(p => {
        total += p.price*p.quantity;
    });
    return total;
}

const fee =  (order) => order.shipping?.isInternational ? 50000:0|| 0;

const OrderDetail = ({order}) => {
    const [open, setOpen] = useState(false);

    const onCloseModal = () => {
        setOpen(false);
    };

    const onOpenModal = () => {
        setOpen(true);
    }

    return(
        <>
            <div>
                <p style={{width: "10rem", borderRadius: "10px", backgroundColor: statusDetails[order.status]?.color||"white"}}>{statusDetails[order.status]?.msg||''}</p>
                <button
                    className='button button-small button-round'
                    style={{float: "right"}}
                onClick={onOpenModal}>
                    Details
                </button>
                <button
                    className='button button-small button-round'
                    disabled={order.status === 0 || order.status > 1? true:false}
                >
                    Cancel
                </button>
            </div>
            <Modal isOpen={open} onRequestClose={onCloseModal}>
                <div style={{width: "800px"}}></div>
                <h3 style={{textAlign: "center"}}>Order Detail</h3>
                <span>Order ID:&nbsp;
                    <i className="text-subtle text-italic">{order.id}</i>
                </span><br/><br/>
                <span>Payment: &nbsp;
                    <i className="text-subtle text-italic">{order.payment?.type|| ''}</i>
                </span><br/><br/>
                <span>Address: &nbsp;
                    <i className="text-subtle text-italic">{order.shipping?.address || ''}</i>
                </span><br/><br/>
                <span>Mobile number: &nbsp;
                    <i className="text-subtle text-italic">+{(order.shipping?.mobile.value) || ''}</i>
                </span><br/><br/>
                <span>Product List
                    {order.products.map((p, index) => (
                        <OrderItem product={p} key={index} order={order}></OrderItem>
                    ))}
                </span><br/>
                <div style={{textAlign: "right"}}>
                    <span>Total: &nbsp;
                        <i className="text-subtle text-italic">{displayMoney(total(order.products))}</i>
                    </span><br/><br/>
                        <span>Shipping Fee: &nbsp;
                            <i className="text-subtle text-italic">{displayMoney(fee(order))}</i>
                    </span><br/><br/>
                        <span>Pay: &nbsp;
                            <i className="text-subtle text-italic">{displayMoney(total(order.products)+fee(order))}</i>
                    </span><br/><br/>
                </div>
                <div>
                    <button
                        className='button button-small button-round'
                        onClick={()=>setOpen(false)}>
                        OK
                    </button>
                </div>
            </Modal>

        </>
    )
}

OrderDetail.prototype = {
    order: PropType.object.isRequired
}

export default OrderDetail;