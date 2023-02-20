import './SectionContainerWrapper.scss'
import React from 'react'
import { Container, Row } from 'reactstrap'

interface SectionContainerWrapperProps {
    className?: string;
    children: React.ReactNode;
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