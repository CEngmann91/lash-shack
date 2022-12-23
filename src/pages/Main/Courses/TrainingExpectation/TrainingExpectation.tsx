import './TrainingExpectation.scss';
import React from 'react'
import { Page } from '../../../../components'
import { SectionedCard } from '../../../../components/Cards'
import { Training_1to1Training, Training_Mannequin, Training_Manuals, Training_Models } from '../../../../util/images'

const TrainingExpectation = () => {

    
    return (
        <Page id='training-expectation' className='app__flex app__training-expectation' header='What Can I Expect?'>
            {/* <p>All training performed will be conducted by our certified Lash Technician Specialist who will</p> */}

            <div className="list">
                <SectionedCard
                    className='expectation-card'
                    leftChildren={(
                        <div className='app__flex pad--left txt-cntr'>
                            <h1>In-depth Training</h1>
                            <label></label>
                        </div>
                    )}
                    rightChildren={(
                        <img src={Training_1to1Training} />
                    )}
                />



                <SectionedCard
                    // className='expectation-card'
                    leftChildren={(
                        <div className='app__flex pad--right txt-cntr'>
                            <h1>Theory Sessions</h1>
                            <label>In-depth manual training includes:</label>
                            <ul>
                                <li>Weights, lengths and curls</li>
                                <li>Tweezers</li>
                                <li>Glue and Humidity</li>
                                <li>Lash preparation</li>
                                <li>Correct Isolation</li>
                                <li>Infills, removals and Aftercare</li>
                            </ul>
                        </div>
                    )}
                    rightChildren={(
                        <img src={Training_Manuals} />
                    )}
                    reversed={true}
                />


                <SectionedCard
                    // className='expectation-card'
                    leftChildren={(
                        <div className='app__flex pad--left txt-cntr'>
                            <h1>Mannequin Training</h1>
                            <ul>
                                <li>2hr Mannequin head practice</li>
                                <li></li>
                            </ul>
                        </div>
                    )}
                    rightChildren={(
                        <img src={Training_Mannequin} />
                    )}
                />



                <SectionedCard
                    // className='expectation-card'
                    leftChildren={(
                        <div className='app__flex pad--right txt-cntr'>
                            <h1>Live Model Sessions</h1>
                            <label>We provide a live model for our students to gain hands on pratice.</label>
                        </div>
                    )}
                    rightChildren={(
                        <img src={Training_Models} />
                    )}
                    reversed={true}
                />
            </div>


        </Page >
    )
}

export default TrainingExpectation