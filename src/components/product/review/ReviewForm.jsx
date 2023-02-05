/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useState } from "react";
import firebase from "@/services/firebase";
import { useHistory, useParams } from "react-router-dom";
import { displayActionMessage } from "@/helpers/utils";
import StarRating from "@/views/account/components/starRating";

const ReviewForm = ({product, closeFunc}) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const { id } = product;

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  const submit = async () => {
      if (review === "") return setError("Review is required!");
      if (rating === 0) return setError("Rating is required!");
      const doc = await firebase.addReview(id, review, rating);
      if (doc) displayActionMessage("Your review has been saved", "success");
      closeFunc();
      window.location.reload();
  };
  return (
    <div>
      <form>
        <label
          htmlFor="review-text"
          className="text-center"
          style={{
            display: "block",
            border: "none",
            background: "none",
            padding: "0px",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontSize: "2rem",
          }}
        >
          Your review
        </label>
          <span style={{color: "red"}}>{error}</span>
        <br/><br/>
          <StarRating rating={rating} setRating={setRating}/>
          <br/>
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
