import './ExpertCard.scss';
import React from 'react';
import { iExpert } from '../MeetExperts';
import { Card } from '../../../components/Cards';

const ExpertCard: React.FC<iExpert> = (item, { ...props }: iExpert) => {
    return (
        <Card className="expert-card-item border-white border-white-shadow">
             <div className='container'>

                 <div className="top-border">

                 </div>


                 <div className="headshot app__style-effect__shine">
                     <img src={item.imgSrc} alt={"Me"} />
                 </div>

                 <div className="info">
                     <h1 className='name'>{item.name}</h1>
                     <hr/>
                     <p className='position'>{item.position}</p>
                 </div>
             </div>
        </Card>







        // <div className='card'>
        //     <div className="headshot">

        //     </div>

        //     <h1>{item.name}</h1>
        //     <p>{item.position}</p>
        // </div>
    )
}

export default ExpertCard