/* eslint-disable react/forbid-prop-types */
import PropType from 'prop-types';
import React from 'react';
import {NavLink} from "react-router-dom";
import {useModal} from "@/hooks";
import {ADMIN_USERS} from "@/constants/routes";
import UserInfo from "@/views/admin/components/UserInfo";
import OrderItem from "@/views/admin/orders/OrderItem";

const OrdersTable = ({ filteredOrders}) => {
    return (
        <div>
            {filteredOrders.length > 0 && (
                <div className="grid grid-product grid-count-6">
                    <div className="grid-col"/>
                    <div className="grid-col">
                        <h5>Name</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Order ID</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Date Created</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Total price</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Status</h5>
                    </div>
                </div>
            )}
            {filteredOrders.length === 0 ? new Array(10).fill({}).map((order, index) => (
                <OrderItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={`product-skeleton ${index}`}
                    order={order}
                />
            )) : filteredOrders.map((order) => (
                <div key={order.id}
                >
                    <OrderItem
                        order={order}
                    />
                    <br/>
                </div>
            ))}
        </div>
    );
};

OrdersTable.propTypes = {
    filteredOrders: PropType.array.isRequired
};

export default OrdersTable;
