import './SectionContainerWrapper.scss'
import { ReactNode } from 'react'
import { Container, Row } from 'reactstrap'

interface SectionContainerWrapperProps {
    className?: string;
    children: ReactNode;
}
const SectionContainerWrapper = ({ className, children, ...props }: SectionContainerWrapperProps) => {

    return (
        <section className={`section-container_wrapper__section ${className}`}>
            <Container>
                <Row>
                    {children}
                </Row>
            </Container>
        </section>
    )
}

export default SectionContainerWrapper