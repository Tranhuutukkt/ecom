import React, { Fragment, useEffect, useRef, useState } from "react";
import {useParams, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeOrderStatus, getAllOrder} from "@/redux/actions/orderActions";
import OrderItem from "@/views/account/components/user-orders/OrderItem";
import {displayMoney} from "@/helpers/utils";
import {useDocumentTitle, useScrollTop} from "@/hooks";

const ViewOrder = () => {
    useDocumentTitle('View Order');
    useScrollTop();

    const statusDetails = [
        {msg: 'Canceled', color: 0},
        {msg: 'Confirming', color: 1},
        {msg: 'Confirmed', color: 2},
        {msg: 'Delivering', color: 3},
        {msg: 'Successfully', color: 4},
        {msg: 'Failed', color: 5}
    ];

    const {id} = useParams();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);


    const order = useSelector((state) => state.orders.orders.find(o => o.id === id));

    useEffect(() => {
        dispatch(getAllOrder());
        setLoading(true);
        if (order) setLoading(false);
    }, []);

    const total = (product) => {
        let total = 0;
        product.map(p => {
            total += p.price*p.quantity;
        });
        return total;
    }

    const fee =  (order) => order.shipping?.isInternational ? 50000:0|| 0;

    const handleOrderStatus = (id) => {
        const newData = order;
        delete newData.name;
        delete newData.avatar;
        newData.status = id;
        console.log(newData.status);
        dispatch(changeOrderStatus(newData));
    }

    return (
        <Fragment>
            {isLoading? "Loading" :(<div style={{marginTop: "50px", marginRight: "100px", marginLeft: "100px"}}>
            <h3 style={{textAlign: "center"}}>Order Detail</h3>
            <span>Order ID:&nbsp;
                <i className="text-subtle text-italic">{order.id}</i>
                </span><br/><br/>
            <span>Customer Name:&nbsp;
                <i className="text-subtle text-italic">{order.name}</i>
            </span><br/><br/>
            <span>Payment: &nbsp;
                <i className="text-subtle text-italic">{order.payment?.type || ''}</i>
                </span><br/><br/>
            <span>Address: &nbsp;
                <i className="text-subtle text-italic">{order.shipping?.address || ''}</i>
                </span><br/><br/>
            <span>Mobile number: &nbsp;
                <i className="text-subtle text-italic">+{(order.shipping?.mobile.value) || ''}</i>
                </span><br/><br/>
            <span>Product List<br/>
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
                    <i className="text-subtle text-italic">{displayMoney(total(order.products) + fee(order))}</i>
                    </span><br/><br/>
            </div>
            <div className="grid grid-product grid-count-6">
                <button
                    className='button button-small button-round grid-col'
                    onClick={() => history.back()}>
                    OK
                </button>
                {statusDetails.map(s => ((s.msg !== 'Confirming') && (
                            <button
                                className='button button-small button-round'
                                onClick={()=>handleOrderStatus(s.color)}
                            key={s.msg}>
                                {s.msg}
                            </button>
                        )
                ))}
            </div>
            </div>)}
        </Fragment>
    );
}

export default withRouter(ViewOrder);