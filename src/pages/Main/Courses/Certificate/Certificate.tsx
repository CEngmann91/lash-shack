import './Certificate.scss';
import React from 'react'
import { Page } from '../../../../components'
import { ABT, TrainingCertificate_Watermark } from '../../../../util/images'

const Certificate = () => {
    
  return (
    <Page id='certificate' className='app__flex app__certificate' header='What Happens Next?'>
      <p>At the end of every training, we present the newly qualified trainee with this certficate.</p>
      <p>We provide ongoing support, provide shadow days and ongoing assistance with models, if needed.</p>
      <div className="app__certificate--img">
        <img src={TrainingCertificate_Watermark} className='' />
      </div>

      <img className='abt' src={ABT} alt="" />
    </Page>
  )
}

export default Certificate