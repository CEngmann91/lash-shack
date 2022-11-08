import './ExpertCard.scss';
import React from 'react';
import { iExpert } from '../MeetExperts';

const ExpertCard: React.FC<iExpert> = (item, { ...props }: iExpert) => {
    return (
        <div className="item" data-index={item.id}>
            <div className='container'>
                <div className="headshot">
                    <img src={item.imgSrc} alt={"Me"} />
                </div>

                <div className="info">
                    <h1 className='name'>{item.name}</h1>
                    <p className='position'>{item.position}</p>
                </div>



                {/* <div className="headshot">                         
                    <img src={item.imgSrc} alt={"Me"} />
                </div> */}

            </div>
        </div>


        // <div className='card'>
        //     <div className="headshot">

        //     </div>

        //     <h1>{item.name}</h1>
        //     <p>{item.position}</p>
        // </div>
    )
}

export default ExpertCard