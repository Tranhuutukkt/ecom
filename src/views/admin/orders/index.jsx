/* eslint-disable react/jsx-props-no-spreading */
import { Boundary } from '@/components/common';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getAllOrder} from "@/redux/actions/orderActions";
import OrdersNavbar from "@/views/admin/orders/OrdersNavbar";
import OrdersTable from "@/views/admin/orders/OrdersTable";

const Orders = () => {
    useDocumentTitle('Order List | TeiTouShopping Admin');
    useScrollTop();

    const [searchQuery, setSearchQuery] = useState("");

    const dispatch = useDispatch();

    const store = useSelector((state) => ({
        orders: state.orders,
        requestStatus: state.app.requestStatus,
        isLoading: state.app.loading
    }));

    useEffect(() => {
        dispatch(getAllOrder());
    }, []);

    const handleSearch = query =>{
        setSearchQuery(query);
    }

    const getData = () => {
        let orderList = store.orders.orders;
        if (searchQuery) {
            orderList = store.orders.orders.filter(
                o => o.fullname.toLowerCase().match(searchQuery.toLowerCase()) ||
                    o.email.toLowerCase().match(searchQuery.toLowerCase())
            );
        }
        return {filteredOrders: orderList}
    }

    const {filteredOrders} = getData();

    return (
        <Boundary>
            <div>
                <OrdersNavbar
                    totalOrdersCount={store.orders.total || 0}
                    handleSearch={handleSearch}
                />
                <div className="product-admin-items">
                    <OrdersTable filteredOrders={filteredOrders}/>
                </div>
            </div>
        </Boundary>
    );
};

export default withRouter(Orders);
