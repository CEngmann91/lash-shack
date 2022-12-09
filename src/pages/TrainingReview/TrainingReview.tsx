import './TrainingReview.scss';
import React from 'react'
import { ActivityIndicator, Page } from '../../components';
import TrainingReviewCard from './TrainingReviewCard/TrainingReviewCard';

export interface iTrainingReview {
    id: number;
    name: string;
    description: string;
}


interface iProps {
    reviews: iTrainingReview[];
    loading: boolean;
    error?: any;
}
const TrainingReview: React.FC<iProps> = ({ reviews, loading, error, ...props }: iProps) => {

    const renderLoadingActivity = (): React.ReactNode => (
        <Page id='training-reviews' className='app__training-review' header='Training Reviews' headerClassName='app__training-review-title page-title-size'>
            <div className='app__flex app__min-height'>
                <ActivityIndicator borderColour='rgba(239, 179, 183, 1)' borderSpinColour='rgba(16, 40, 121, 1)' />
            </div>
        </Page>
    );

    return (
        <Page id='training-reviews' className='app__training-review' header='Training Reviews' headerClassName='app__training-review-title page-title-size'>
            {loading
                ?
                renderLoadingActivity()
                :
                (error ?
                    <>
                        <p>Error is: {error}</p>
                    </>
                    :
                    <div className="app__training-review--list">
                        {reviews.map(({ id, name, description }) =>
                            <TrainingReviewCard
                                key={id}
                                id={id}
                                name={name}
                                description={description}
                            />
                        )}
                    </div>)
            }
        </Page>
    )
}

export default TrainingReview