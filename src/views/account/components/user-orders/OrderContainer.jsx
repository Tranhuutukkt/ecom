import { Fragment } from "react";
import ProductInOrder from "./ProductInOrder";
import { calculateTotal } from "@/helpers/utils";
import { displayMoney } from "@/helpers/utils";

export default function OrderContainer({ order }) {
  return (
    <div
      style={{
        width: "100%",
        height: "16rem",
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
          <ProductInOrder product={item} key={index} />
        ))}
      </div>
    </div>
  );
}
