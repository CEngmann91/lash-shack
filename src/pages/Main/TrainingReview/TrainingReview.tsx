import './TrainingReview.scss';
import React, { ReactNode } from 'react'
import { ActivityIndicator, Page } from '../../../components';
import TrainingReviewCard from './TrainingReviewCard/TrainingReviewCard';

export interface iTrainingReview {
    id: number;
    name: string;
    description: string;
}


interface iProps {
    reviews: iTrainingReview[];
    loading: boolean;
    error?: unknown;
}
const TrainingReview: React.FC<iProps> = ({ reviews, loading, error, ...props }: iProps) => {

    const renderLoadingActivity = (): ReactNode => (
        <div className='app__item-loading' />
    )

    return (
        <Page id='training-reviews' className='app__training-review' header='Training Reviews' headerClassName='app__training-review-title page-title-size'>
            {loading
                ?
                (renderLoadingActivity())
                :
                (error ?
                    <>
                        <p>Error is: {error.toString()}</p>
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