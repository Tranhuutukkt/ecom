import {ImageLoader} from "@/components/common";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import { displayMoney} from "@/helpers/utils";
import React, {useRef} from "react";
import {useHistory} from "react-router-dom";
import {RETURN_REQUEST} from "@/constants/routes";
import ReturnForm from "@/views/account/returnForm/returnForm";
import {useDispatch} from "react-redux";
import {addReturnRequest} from "@/redux/actions/returnAction";

const OrderItem = ({product, order}) => {
    const productRef = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const returnSubmit = (data) => {
        dispatch(addReturnRequest(data));
    }

    return (
        <>
            <SkeletonTheme
                color="#e1e1e1"
                highlightColor="#f2f2f2"
            >
                <div
                    className={`item item-products ${!product.id && 'item-loading'}`}
                    ref={productRef}
                >
                    <div className="grid grid-count-9">
                        <div className="grid-col item-img-wrapper">
                            {product.image ? (
                                <ImageLoader
                                    alt={product.name}
                                    className="item-img"
                                    src={product.image}
                                />
                            ) : <Skeleton width={50} height={30} />}
                        </div>
                        <div className="grid-col">
                            <span className="text-overflow-ellipsis">{product.name || <Skeleton width={50} />}</span>
                        </div>
                        <div className="grid-col">
                            <span>{product.brand || <Skeleton width={50} />}</span>
                        </div>
                        <div className="grid-col">
                            <span>{product.selectedSize || <Skeleton width={10} />}</span>
                        </div>
                        <div className="grid-col">
                            <span>{product.price ? displayMoney(product.price) : <Skeleton width={30} />}</span>
                        </div>
                        <div className="grid-col">
                            <span>{product.quantity || <Skeleton width={20} />}</span>
                        </div>
                        <div className="grid-col">
                        <span>
                            {product.price ? displayMoney(product.price*product.quantity) : <Skeleton width={30} />}
                        </span>
                        </div>
                        <div className="grid-col">
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
                        <div className="grid-col">
                            <ReturnForm product={product} order={order} isLoading={false} onSubmit={returnSubmit}/>
                        </div>
                    </div>
                </div>
            </SkeletonTheme>
        </>
    )
}

export default OrderItem;