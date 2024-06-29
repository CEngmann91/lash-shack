import './TermsOfService.scss';
import { Accordion, ImageBanner, PageWrapper } from '../../components';
import { POLICIES } from '../../constants/text';

const TermsOfService = () => {

    return (
        <PageWrapper title="Terms of Service">
            <ImageBanner title='Terms of Service' />

            <section className='terms__section'>
                <Accordion id='1' title={POLICIES.APPOINTMENTS.TITLE} content={POLICIES.APPOINTMENTS.DESCRIPTION} />
                <Accordion id='2' title={POLICIES.LATENESS.TITLE} content={POLICIES.LATENESS.DESCRIPTION} />
                <Accordion id='3' title={POLICIES.CANCELLATIONS.TITLE} content={POLICIES.CANCELLATIONS.DESCRIPTION} />
                <Accordion id='4' title={POLICIES.REFUND.TITLE} content={POLICIES.REFUND.DESCRIPTION} />
            </section>
        </PageWrapper>
    );
}

export default TermsOfService