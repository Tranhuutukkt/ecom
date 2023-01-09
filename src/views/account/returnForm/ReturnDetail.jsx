import React, {useState} from "react";
import {ImageLoader, Modal} from "@/components/common";
import PropType from "prop-types";
import OrderItem from "@/views/account/components/user-orders/OrderItem";
import {displayDate, displayMoney} from "@/helpers/utils";

const ReturnDetail = ({data}) => {
    const [open, setOpen] = useState(false);

    const onCloseModal = () => {
        setOpen(false);
    };

    const onOpenModal = () => {
        setOpen(true);
    }

    return(
        <>
            <div>
                <button
                    className='button button-small button-round'
                    style={{float: "right"}}
                    onClick={onOpenModal}>
                    Details
                </button>
            </div>
            <Modal isOpen={open} onRequestClose={onCloseModal}>
                <div style={{width: "600px"}}></div>
                <h3 style={{textAlign: "center"}}>Return Request</h3>
                <span>Request ID:&nbsp;
                    <i className="text-subtle text-italic">{data.id}</i>
                </span><br/><br/>
                <span>Day: &nbsp;
                    <i className="text-subtle text-italic">{displayDate(data.returns.dateAdded)}</i>
                </span><br/><br/>
                <span>Reason: &nbsp;
                    <i className="text-subtle text-italic">{data.returns.reason}</i>
                </span><br/><br/>
                <span>Return Image
                    {data.returns.returnImage.map((p, index) => (
                        <div style={{width: "20rem", height: "20rem"}}>
                            <ImageLoader
                                alt=""
                                className="product-form-image-preview"
                                src={p.url}
                                key={index}
                            />
                        </div>

                    ))}
                </span><br/>
                <div>
                    <button
                        className='button button-small button-round'
                        onClick={()=>setOpen(false)}>
                        OK
                    </button>
                </div>
            </Modal>

        </>
    )
}

ReturnDetail.prototype = {
    data: PropType.object.isRequired
}

export default ReturnDetail;