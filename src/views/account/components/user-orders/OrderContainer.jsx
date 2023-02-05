import { Fragment } from "react";
import ProductInOrder from "./ProductInOrder";
import { calculateTotal } from "@/helpers/utils";
import { displayMoney } from "@/helpers/utils";
import OrderDetail from "@/views/account/components/user-orders/OrderDetail";

export default function OrderContainer({ order }) {
  return (
    <div
      style={{
        width: "100%", height: "300px",
        backgroundColor: "white",
        border: "1px solid #E1E1E1",
        marginBottom: "1rem",
        padding: "1rem",
      }}
    >
      <strong style={{ float: "left", color: "#737373" }}>
        Total:{" "}
        <i style={{ fontWeight: "normal" }}>
          {displayMoney(
            calculateTotal(
              order.products.map((product) => product.price * product.quantity)
            )
          )}
        </i>
      </strong>
      <i
        style={{
          float: "right",
          fontWeight: "lighter",
          color: "#737373",
          fontSize: "1.5rem",
        }}
      >
        <u>{order.createdAt}</u>
      </i>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "12rem",
          flexDirection: "row",
          overflow: "auto",
        }}
      >
        {order.products.map((item, index) => (
            <div key={index}>
                <ProductInOrder product={item} /><br/>
            </div>

        ))}
      </div>
        <OrderDetail order={order}/>
    </div>
  );
}
