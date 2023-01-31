import {ImageLoader, Modal} from '@/components/common';
import {calculateTotal, displayActionMessage, displayDate, displayMoney} from '@/helpers/utils';
import PropType from 'prop-types';
import React, {Fragment, useEffect, useRef} from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { VIEW_RETURN} from "@/constants/routes";
import {useModal} from "@/hooks";


const ReturnItem = ({returns}) => {
    const { isOpenModal, onOpenModal, onCloseModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();
    const returnsRef = useRef(null);

    const onClickView = () => {
        history.push(`${VIEW_RETURN}/${returns.id}`);
    };

    return (
        <Fragment>
            <SkeletonTheme
                color="#e1e1e1"
                highlightColor="#f2f2f2"
            >
                <div
                    className={`item item-products ${!returns.id && 'item-loading'}`}
                    ref={returnsRef}
                >
                    <div className="grid grid-count-6">
                        <div className="grid-col item-img-wrapper">
                            {returns.avatar ? (
                                <ImageLoader
                                    alt={returns.name}
                                    className="item-img"
                                    src={returns.avatar}
                                />
                            ) : <Skeleton width={30} height={30} />}
                        </div>
                        <div className="grid-col">
                            <span className="text-overflow-ellipsis">{returns.name || ""}</span>
                        </div>
                        <div className="grid-col">
                            <span>{returns.returns?.orderID || ""}</span>
                        </div>
                        <div className="grid-col">
                        <span>
                             {returns.returns?.dateAdded ? displayDate(returns.returns.dateAdded) : ""}
                        </span>
                        </div>
                        <div className="grid-col">
                            <span>
                                {returns.returns?.reason ? returns.returns.reason : ""}
                            </span>
                        </div>
                        <div className="grid-col">
                             <span>
                                {returns.status === 1 ?  "Accept" : (returns.status===0?"Refuse":"")}
                            </span>
                        </div>
                    </div>
                    {returns.id && (
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

        </Fragment>

    );
};

ReturnItem.propTypes = {
    returns: PropType.shape({
        id: PropType.string,
        userID: PropType.string,
    }).isRequired
};

export default withRouter(ReturnItem);
