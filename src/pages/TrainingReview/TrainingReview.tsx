import './TrainingReview.scss';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Page } from '../../components';
import TrainingReviewCard from './TrainingReviewCard/TrainingReviewCard';
import { getDocument } from '../../helpers/firebase/firestore';
import { REACT_APP_FIRESTORE_TRAINING_COLLECTION, REACT_APP_FIRESTORE_TRAINING_DOCUMENT } from '../../constants/firebase';

export interface iTrainingReview {
    id: number;
    name: string;
    description: string;
}
// const reviews: iTrainingReview[] = [
//     {
//         id: 0,
//         description: "Training was so insightful, I gained so much knowledge and really felt like I grasped the technique. I have previously done a course and I did not feel how I felt when I left the training with Eyeladh bar. Eni and Emma. I would recommend it and I would love to do the topup course.",
//         name: "Pheobe"
//     },
//     {
//         id: 1,
//         description: "I trained with Emma 1/1 & it was so much better than I expected, at first I was worried about asking questions etc and she made me feel so at ease and the training was so detailed and I learned so much, wouldn't recommend anyone else x",
//         name: "Angel"
//     },
//     {
//         id: 2,
//         description: "Training was knowledge and they take their time to teach you and help you be better lash tech in the future. What advice I would give is to keep in contact with them even after you finish your course and always ask questions and take on board what they say and do it.",
//         name: "Rochelle"
//     }
// ]

const TrainingReview = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [reviews, setReviews] = useState<iTrainingReview[]>([]);



    useEffect(() => {
        window.scrollTo(0, 0);

        fetchReviews();
    }, [])


    const fetchReviews = async() => {
        setIsLoading(true);

        getDocument(REACT_APP_FIRESTORE_TRAINING_COLLECTION as string,
            REACT_APP_FIRESTORE_TRAINING_DOCUMENT as string)
            .then(res => {
                const array: iTrainingReview[] = res['content'];
                let sorted = array.sort((a, b) => a.id - b.id);
                setReviews(sorted);

                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }

    if (isLoading) {
        return (
            <Page id='training-reviews' className='app__training-review' header='Training Reviews' headerClassName='app__training-review-title page-title-size'>
                <div className='app__flex app__min-height'>
                    <ActivityIndicator borderColour='rgba(239, 179, 183, 1)' borderSpinColour='rgba(16, 40, 121, 1)' />
                </div>
            </Page>
        );
    }


    return (
        <Page id='training-reviews' className='app__training-review' header='Training Reviews' headerClassName='app__training-review-title page-title-size'>
            {error ?
                <>
                    <p>Error is: {error}</p>

                </>
                :
                <div className="list">
                    {reviews.map(({ id, name, description }) =>
                        <TrainingReviewCard
                            key={id}
                            id={id}
                            name={name}
                            description={description}
                        />
                    )}
                </div>
            }
        </Page>
    )
}

export default TrainingReview