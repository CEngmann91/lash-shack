import './RefundPolicy.scss'
import { useNavigate } from 'react-router-dom';
import React, { useCallback } from 'react';
import { ArrowMotionButton, ImageBanner, PageWrapper } from '../../components'
import { REFUND_POLICY_TEXT } from '../../constants/text';

const RefundPolicy = () => {
    const navigate = useNavigate();

    const handleContactClick = useCallback(() => {
        navigate("/contact");
    }, [navigate]);

    return (
        <PageWrapper title="Refunds">
            <ImageBanner title='Refund Policy' />

            <section className='refund__section'>
                <h1 className="text-center mb-4">{REFUND_POLICY_TEXT.TITLE}</h1>

                <p className="px-4 text-center">{REFUND_POLICY_TEXT.PARAGRAPH_1}</p>
                <br />
                <p className="px-4 text-center">{REFUND_POLICY_TEXT.PARAGRAPH_2}</p>

                <div className='d-flex flex-column justify-content-center align-items-center mt-4'>
                    <h4 className='text-center'>{REFUND_POLICY_TEXT.HELP_TITLE}</h4>
                    <ArrowMotionButton className='refund__cta-button w-15 mt-2' onClick={handleContactClick}>
                        {REFUND_POLICY_TEXT.CONTACT_US}
                    </ArrowMotionButton>
                </div>
            </section>
        </PageWrapper>
    )
}

export default React.memo(RefundPolicy);