import { Link } from "react-router-dom";
import { ImageLoader } from "@/components/common";
import { displayMoney } from "@/helpers/utils";

export default function ProductInOrder({ product }) {
  return (
    <div
      className="basket-item-wrapper"
      style={{ border: "1px solid #E1E1E1" }}
    >
      <div className="basket-item-img-wrapper">
        <ImageLoader
          alt={product.name}
          className="basket-item-img"
          src={product.image}
        />
      </div>
      <div className="basket-item-details">
        <Link to={`/product/${product.id}`}>
          <h4 className="underline basket-item-name">{product.name}</h4>
        </Link>
        <div className="basket-item-specs">
          <div>
            <span className="spec-title">Quantity</span>
            <h5 className="my-0">{product.quantity}</h5>
          </div>
          <div>
            <span className="spec-title">Size</span>
            <h5 className="my-0">{product.selectedSize}</h5>
          </div>
          <div>
            <span className="spec-title">Color</span>
            <div
              style={{
                backgroundColor:
                  product.selectedColor || product.availableColors[0],
                width: "15px",
                height: "15px",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
      </div>
      <div className="basket-item-price">
        <h4 className="my-0">
          {displayMoney(product.price * product.quantity)}
        </h4>
      </div>
    </div>
  );
}
