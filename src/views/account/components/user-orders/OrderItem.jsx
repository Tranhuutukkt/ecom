import {ImageLoader, Modal} from "@/components/common";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import { displayMoney} from "@/helpers/utils";
import React, {useRef} from "react";
import {useHistory} from "react-router-dom";
import {RETURN_REQUEST} from "@/constants/routes";
import ReturnForm from "@/views/account/returnForm/returnForm";
import {useDispatch} from "react-redux";
import {addReturnRequest} from "@/redux/actions/returnAction";
import {CloseOutlined} from "@ant-design/icons";
import ReviewForm from "@/components/product/review/ReviewForm";
import {useModal} from "@/hooks";

const OrderItem = ({product, order}) => {
    const {onOpenModal, isOpenModal, onCloseModal} = useModal();
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
                    <div className="grid grid-count-10">
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
                        <div className="grid-col">
                            <button
                                className={`button button-small button-round`}
                                type="button"
                                onClick={onOpenModal}
                                disabled={order.status !== 4}
                            >
                                Write review
                            </button>
                        </div>
                    </div>
                </div>
            </SkeletonTheme>
            <Modal isOpen={isOpenModal} onRequestClose={onCloseModal}>
                <button
                    className="modal-close-button button button-border button-border-gray button-small"
                    onClick={onCloseModal}
                    type="button"
                >
                    <CloseOutlined />
                </button>
                <ReviewForm closeFunc={onCloseModal} product={product}/>
            </Modal>
        </>
    )
}

export default OrderItem;