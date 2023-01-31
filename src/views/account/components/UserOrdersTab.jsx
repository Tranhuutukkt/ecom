import React, { Fragment, useEffect, useState } from "react";
import OrderContainer from "./user-orders/OrderContainer";
import firebase from "@/services/firebase";
import {useDispatch, useSelector} from "react-redux";
import {getOrderByUser} from "@/redux/actions/orderActions";

const UserOrdersTab = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByUser());
  }, [orders]);

  return (
    <div className="loader" style={{ height: "80vh" }}>
      {orders.total === 0 ? (
        <Fragment>
          <h3>My Orders</h3>
          <strong>
            <span className="text-subtle">You don&apos;t have any orders</span>
          </strong>
        </Fragment>
      ) : (
        <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
          {orders.orders.map((item, index) => (
              <div key={index}>
                <OrderContainer order={item}/>
                <br/>
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrdersTab;
