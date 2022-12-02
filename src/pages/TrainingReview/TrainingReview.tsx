import './TrainingReview.scss';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Page } from '../../components';
import TrainingReviewCard from './TrainingReviewCard/TrainingReviewCard';

export interface iTrainingReview {
    id: number;
    name: string;
    description: string;
}


interface iProps {
    reviews: iTrainingReview[];
}
const TrainingReview: React.FC<iProps> = ({ reviews, ...props }: iProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    // const [reviews, setReviews] = useState<iTrainingReview[]>([]);



    // useEffect(() => {
    //     window.scrollTo(0, 0);

    //     fetchReviews();
    // }, [])


    /*const fetchReviews = async() => {
        setIsLoading(true);

        getDocument(REACT_APP_FIRESTORE_TRAINING_COLLECTION as string,
            REACT_APP_FIRESTORE_TRAINING_DOCUMENT as string)
            .then(res => {
                const array: iTrainingReview[] = res['content'];
                let sorted = array.sort((a, b) => a.id - b.id);
                setReviews(sorted);

                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error);
                return;
            });
    }*/

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