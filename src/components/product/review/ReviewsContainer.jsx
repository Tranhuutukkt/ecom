import React, {Fragment, Suspense, useEffect, useState} from "react";
import firebase from "@/services/firebase";
import { useParams } from "react-router-dom";
import SingleReview from "./SingleReview";
import RatingView from "@/views/account/components/RatingView";
import UserTab from "@/views/account/components/UserTab";

export default function ReviewsContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const star = [0, 1, 2, 3, 4, 5];

  function Loader() {
    return null;
  }

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
      <h3>Review</h3>
      <div style={{marginBottom: "15px"}}>
        <RatingView reviews={reviews}/>
      </div>
      <br/><br/>
      <div style={{marginTop: "120px"}}>
        <UserTab>
          {star.map(s => (
              <div key={s} index={s} label={s === 0? "All": s+ ' ⭐'}>
                <Suspense fallback={<Loader/>}>
                  <div>
                    {reviews.filter(r => r.rating === s).length === 0 && s !== 0 ?
                        <span className="text-subtle">
                            Don&apos;t have reviews.</span>: ""}
                    {reviews.map((item, index) =>{
                      if (item.rating === s || s === 0)
                        return (
                            <SingleReview key={index} reviewData={item}/>
                        )
                    })}
                  </div>
                </Suspense>
              </div>)
          )}
        </UserTab>
      </div>

    </Fragment>
  );
}
