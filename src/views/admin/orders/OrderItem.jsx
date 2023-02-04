import {ImageLoader, Modal} from '@/components/common';
import {calculateTotal, displayActionMessage, displayDate, displayMoney} from '@/helpers/utils';
import PropType from 'prop-types';
import React, {Fragment, useEffect, useRef} from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import {VIEW_ORDER} from "@/constants/routes";
import {useModal} from "@/hooks";
import UserInfo from "@/views/admin/components/UserInfo";
import {changeStatus, getAllUser} from "@/redux/actions/userActions";
import firebase from "firebase";

const statusDetails = [
    {msg: 'Canceled', color: "burlywood"},
    {msg: 'Confirming', color: "aquamarine"},
    {msg: 'Confirmed', color: "lawngreen"},
    {msg: 'Delivering', color: "lavenderblush"},
    {msg: 'Successfully', color: "lightskyblue"},
    {msg: 'Failed', color: "lightcoral"}
];

const OrderItem = ({order}) => {
    const { isOpenModal, onOpenModal, onCloseModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();
    const orderRef = useRef(null);

    const onClickView = () => {
        history.push(`${VIEW_ORDER}/${order.id}`);
    };

    return (
        <Fragment>
            <SkeletonTheme
                color="#e1e1e1"
                highlightColor="#f2f2f2"
            >
                <div
                    className={`item item-products ${!order.id && 'item-loading'}`}
                    ref={orderRef}
                >
                    <div className="grid grid-count-6">
                        <div className="grid-col item-img-wrapper">
                            {order.avatar ? (
                                <ImageLoader
                                    alt={order.name}
                                    className="item-img"
                                    src={order.avatar}
                                />
                            ) : <Skeleton width={30} height={30} />}
                        </div>
                        <div className="grid-col">
                            <span className="text-overflow-ellipsis">{order.name || ""}</span>
                        </div>
                        <div className="grid-col">
                            <span>{order.id || ""}</span>
                        </div>
                        <div className="grid-col">
                        <span>
                             {order.createdAt ? order.createdAt : ""}
                        </span>
                        </div>
                        <div className="grid-col">
                            <span>
                                {order.total ? displayMoney(order.total) : ""}
                            </span>
                        </div>
                        <div className="grid-col">
                            <span>{order.status? statusDetails[order.status].msg:""}
                            </span>
                        </div>
                    </div>
                    {order.id && (
                        <div className="item-action">
                            <button
                                className="button button-border button-small"
                                onClick={onClickView}
                                type="button"
                            >
                                View
                            </button>
                        </div>

                    )}
                </div>
            </SkeletonTheme>

            {/*<Modal*/}
            {/*    isOpen={isOpenModal} onRequestClose={onCloseModal}*/}
            {/*>*/}
            {/*    <UserInfo closeFunc={onCloseModal} user={user}/>*/}
            {/*</Modal>*/}
        </Fragment>

    );
};

OrderItem.propTypes = {
    order: PropType.shape({
        id: PropType.string,
        userID: PropType.string,
        status: PropType.number
    }).isRequired
};

export default withRouter(OrderItem);
