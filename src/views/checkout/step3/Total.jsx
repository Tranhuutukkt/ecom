import { ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";
import { CHECKOUT_STEP_2 } from "@/constants/routes";
import { useFormikContext } from "formik";
import { displayMoney } from "@/helpers/utils";
import PropType from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setPaymentDetails } from "@/redux/actions/checkoutActions";
import { Modal } from "@/components/common";
import { useBasket } from "@/hooks";
import firebase from "@/services/firebase";
import { displayActionMessage } from "@/helpers/utils";

const Total = ({ isInternational, subtotal }) => {
  const { values, submitForm } = useFormikContext();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { basket, resetBasket } = useBasket();

  const onCloseModal = () => {
    resetBasket();
    history.push("/");
    setOpen(false);
  };
  const onOpenModal = async () => {
    console.log(basket);
    const doc = await firebase.createOrder(basket);
    if (doc) {
      displayActionMessage("Success!", "success");
      setOpen(true);
    } else {
      displayActionMessage("Error, something runs incorrectly!", "error");
    }
  };

  const onClickBack = () => {
    // destructure to only select left fields omitting cardnumber and ccv
    const { cardnumber, ccv, ...rest } = values;

    dispatch(setPaymentDetails({ ...rest })); // save payment details
    history.push(CHECKOUT_STEP_2);
  };

  return (
    <>
      <div className="basket-total text-right">
        <p className="basket-total-title">Total:</p>
        <h2 className="basket-total-amount">
          {displayMoney(subtotal + (isInternational ? 50 : 0))}
        </h2>
      </div>
      <br />
      <div className="checkout-shipping-action">
        <button
          className="button button-muted"
          onClick={() => onClickBack(values)}
          type="button"
        >
          <ArrowLeftOutlined />
          &nbsp; Go Back
        </button>
        <button className="button" disabled={false} onClick={onOpenModal}>
          <CheckOutlined />
          &nbsp; Confirm
        </button>
      </div>
      <Modal isOpen={open} onRequestClose={onCloseModal}>
        <div style={{ width: "400px" }}>
          <label
            htmlFor="review-text"
            style={{
              display: "block",
              border: "none",
              background: "none",
              padding: "0px",
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              fontSize: "3rem",
              textAlign: "center",
              color: "#4F51E8",
            }}
          >
            Your payment succeeded
          </label>
          <br />
          <div
            style={{
              width: "100%",
              marginTop: "3rem",
            }}
          >
            <button
              style={{
                margin: "auto",
                backgroundColor: "#E6E6FF",
                borderRadius: "1rem",
                width: "10rem",
                fontSize: "1.5rem",
              }}
              className={`button button-small button-border button-border-gray`}
              type="button"
              onClick={onCloseModal}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

Total.propTypes = {
  isInternational: PropType.bool.isRequired,
  subtotal: PropType.number.isRequired,
};

export default Total;
