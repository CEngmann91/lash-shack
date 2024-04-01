import './RefundPolicy.scss'
import { useNavigate } from 'react-router-dom';
import { ArrowMotionButton, ImageBanner, PageWrapper } from '../../components'

const RefundPolicy = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper title="Refunds">
            <ImageBanner title='Refund Policy' />
            
            <section className='refund__section'>

                <h1 className="text-center mb-4">Can I have a refund?</h1>

                <p className="px-4 text-center">We take pride in providing excellent service to our established and future clientele, and our policies are presented and provided to reflect this commitment.</p>
                <br/>
                <p className="px-4 text-center mb-4"><b>Please note that we do not issue refunds on salon services.</b> However, if you have any questions or concerns about the service you received, please notify the salon within two days of receiving it. If you are not satisfied with the work performed, we require that you return to the salon so that your hair can be visually inspected. At that time, we will make every effort to make any adjustments to your satisfaction by rescheduling you with the stylist who performed the initial service. Adjustments are made available to you, but only within <b>3</b> days of the initial service.</p>

                <div className='d-flex flex-column justify-content-center align-items-center mt-4'>
                    <h4 className='text-center'>Need More Help?</h4>
                    <ArrowMotionButton className='refund__cta-button w-15 mt-2' onClick={() => navigate("/contact")}>
                        Contact us
                    </ArrowMotionButton>
                </div>
            </section>
        </PageWrapper>
    )
}

export default RefundPolicy