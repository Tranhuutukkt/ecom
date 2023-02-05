import React, {Fragment, Suspense, useEffect, useState} from "react";
import OrderContainer from "../components/user-orders/OrderContainer";
import {useDispatch, useSelector} from "react-redux";
import {getOrderByUser} from "@/redux/actions/orderActions";
import {withRouter} from "react-router-dom";
import {useDocumentTitle, useScrollTop} from "@/hooks";
import UserTabChild from "@/views/account/components/UserTabChild";

function Loader() {
  return null;
}

const statusDetails = [
  {msg: 'All', color: "lightcoral", id: 6},
  {msg: 'Canceled', color: "burlywood", id: 0},
  {msg: 'Confirming', color: "aquamarine", id: 1},
  {msg: 'Confirmed', color: "lawngreen", id: 2},
  {msg: 'Delivering', color: "lavenderblush", id: 3},
  {msg: 'Successfully', color: "lightskyblue", id: 4},
  {msg: 'Failed', color: "lightcoral", id: 5}
];

const UserOrdersTab = () => {
  useDocumentTitle('My Orders');
  useScrollTop();

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
          <Fragment>
            <UserTabChild>
              {statusDetails.map(s => (
                  <div key={s.id} index={statusDetails.indexOf(s)} label={s.msg}>
                    <Suspense fallback={<Loader/>}>
                      <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
                        {orders.orders.filter(o => o.status === s.id).length === 0 && s.id !== 6?
                            <span className="text-subtle">
                              Don&apos;t have orders.</span>: ""}
                        {orders.orders.map((item, index) => {
                          if (item.status === s.id || s.id === 6)
                              return (
                                  <div key={index}>
                                    <OrderContainer order={item}/>
                                    <br/>
                                  </div>
                              )
                          })
                        }
                      </div>
                    </Suspense>
                  </div>
              ))}
            </UserTabChild>
          </Fragment>
      )}
    </div>
  );
};

export default withRouter(UserOrdersTab);
