import './TrainingExpectation.scss';
import React from 'react';
import { Page } from '../../components';

interface TrainingExpectationProps {
}
const TrainingExpectation: React.FC<TrainingExpectationProps> = ({  }: TrainingExpectationProps) => {


    return (
        <Page id='training-expectation' className='app__flex app__training-expectation' header='What Happens Next?'>
            <p>All training performed will be conducted by our certified Lash Technician Specialist who will</p>
            <div className="app__certificate--img">
                
            </div>
        </Page>
    );
}
export default TrainingExpectation