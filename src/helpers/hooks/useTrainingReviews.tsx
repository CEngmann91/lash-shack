import React, { useEffect, useState } from "react";
import { REACT_APP_FIRESTORE_TRAINING_COLLECTION, REACT_APP_FIRESTORE_TRAINING_DOCUMENT } from "../../constants/firebase";
import { iTrainingReview } from "../../pages/TrainingReview/TrainingReview";
import { getDocument } from "../firebase/firestore";

export const useTrainingReviews = () => {
    const [reviews, setReviews] = useState<iTrainingReview[]>([]);
    const [reviewsError, setReviewsError] = useState<any>();
    const [loadingReviews, setLoadingReviews] = useState(false);


    const fetchReviews = async () => {
        try {
            setLoadingReviews(true);

            await getDocument(REACT_APP_FIRESTORE_TRAINING_COLLECTION as string,
                              REACT_APP_FIRESTORE_TRAINING_DOCUMENT as string)
                .then(res => {
                    const array: iTrainingReview[] = res['content'];
                    let sorted = array.sort((a, b) => a.id - b.id);
                    setReviews(sorted);
                })
                .catch(error => setReviewsError(error));
        }
        catch (error) { setReviewsError(error) };

        setLoadingReviews(false);
    }

    useEffect(() => {
        fetchReviews();
    }, [])

    return { reviews, loadingReviews, reviewsError };
}