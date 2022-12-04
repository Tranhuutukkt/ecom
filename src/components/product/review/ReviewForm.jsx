/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useState } from "react";
import firebase from "@/services/firebase";
import { useParams } from "react-router-dom";
import { displayActionMessage } from "@/helpers/utils";

const ReviewForm = (props) => {
  const [review, setReview] = useState("");
  const { id } = useParams();

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  const submit = async () => {
    const doc = await firebase.addReview(id, review);
    if (doc) displayActionMessage("Your review has been saved", "success");
    props.closeFunc();
  };
  return (
    <div>
      <form>
        <label
          htmlFor="review-text"
          style={{
            display: "block",
            border: "none",
            background: "none",
            padding: "0px",
            fontFamily: "Times New Roman, Times, serif",
            fontSize: "2rem",
          }}
        >
          Your review
        </label>
        <br />
        <textarea
          name="review-text"
          type="text"
          value={review}
          onChange={handleChange}
          style={{
            borderRadius: "1rem",
            minWidth: "500px",
            minHeight: "100px",
          }}
        />
        <div
          style={{ width: "100%", backgroundColor: "red", marginTop: "3rem" }}
        >
          <button
            style={{
              float: "right",
              backgroundColor: "#E6E6FF",
              marginRight: "2rem",
              borderRadius: "1rem",
              width: "10rem",
              fontSize: "1.5rem",
            }}
            className={`button button-small button-border button-border-gray`}
            type="button"
            onClick={submit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
