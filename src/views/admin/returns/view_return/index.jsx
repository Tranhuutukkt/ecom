import React, { Fragment, useEffect, useRef, useState } from "react";
import {useParams, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useDocumentTitle, useScrollTop} from "@/hooks";
import {changeReturnStatus, getAllReturn} from "@/redux/actions/returnAction";
import {ImageLoader} from "@/components/common";

const ViewReturn = () => {
    useDocumentTitle('View Return');
    useScrollTop();

    const {id} = useParams();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);


    const returns = useSelector((state) => state.returns.returns.find(o => o.id === id));

    useEffect(() => {
        dispatch(getAllReturn());
        setLoading(true);
        if (returns) setLoading(false);
    }, []);

    console.log(returns);

    const handleReturnStatus = (id) => {
        const newData = returns;
        delete newData.name;
        delete newData.avatar;
        newData.status = id;
        dispatch(changeReturnStatus(newData));
    }

    return (
        <Fragment>
            {isLoading? "Loading" :(<div style={{marginTop: "50px", marginRight: "100px", marginLeft: "100px"}}>
                <h3 style={{textAlign: "center"}}>Return Detail</h3>
                <span>Order ID:&nbsp;
                    <i className="text-subtle text-italic">{returns.returns.orderID}</i>
                </span><br/><br/>
                <span>Customer Name:&nbsp;
                    <i className="text-subtle text-italic">{returns.name}</i>
            </span><br/><br/>
                <span>Return ID: &nbsp;
                    <i className="text-subtle text-italic">{returns.id}</i>
                </span><br/><br/>
                <span>Reason: &nbsp;
                    <i className="text-subtle text-italic">{returns.returns.reason}</i>
                </span><br/><br/>
                <span>Return image<br/>
                    {(returns.returnImage) && returns.returnImage.map((p, index) => (
                        <ImageLoader
                            className="product-card-img"
                            src={p.url}
                        />
                    ))}
                </span><br/>
                <div className="grid grid-product grid-count-6">
                    <button
                        className='button button-small button-round grid-col'
                        onClick={() => history.back()}>
                        OK
                    </button>
                    <button
                        className='button button-small button-round'
                        onClick={()=>handleReturnStatus(1)}>
                        Accept
                    </button>
                    <button
                        className='button button-small button-round'
                        onClick={()=>handleReturnStatus(0)}>
                        Refuse
                    </button>
                </div>
            </div>)}
        </Fragment>
    );
}

export default withRouter(ViewReturn);