import { Fragment, useEffect, useState } from "react";
import firebase from "@/services/firebase";
import { useParams } from "react-router-dom";
import SingleReview from "./SingleReview";

export default function ReviewsContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getDataReviews = async () => {
      const listReviews = await firebase.getReviews(id);

      setReviews(listReviews);
      setIsLoading(false);
    };

    getDataReviews();
  }, []);

  return (
    <Fragment>
      {isLoading
        ? "Loading ..."
        : reviews.map((item, index) => <SingleReview key={index} reviewData={item}/>)}
    </Fragment>
  );
}
