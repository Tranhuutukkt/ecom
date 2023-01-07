import React, { Fragment, useEffect, useState } from "react";
import OrderContainer from "./user-orders/OrderContainer";
import firebase from "@/services/firebase";

// Just add this feature if you want :P

const UserOrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getOrdersData = async () => {
      const ordersData = await firebase.getOrderHistory();
      console.log(ordersData);

      setOrders(ordersData);
      setIsLoading(false);
    };

    getOrdersData();
  }, []);

  if (isLoading)
    return (
      <div className="loader" style={{ height: "80vh" }}>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <div className="loader" style={{ height: "80vh" }}>
      {orders.length === 0 ? (
        <Fragment>
          <h3>My Orders</h3>
          <strong>
            <span className="text-subtle">You don&apos;t have any orders</span>
          </strong>
        </Fragment>
      ) : (
        <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
          {orders.map((item, index) => (
            <OrderContainer order={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrdersTab;
