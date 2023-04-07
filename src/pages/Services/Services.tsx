import './Services.scss'
import { Form_RadioOptionGroup, ImageBanner, LoadingSpinner, PageWrapper, ProductList } from '../../components'
import { Container, Row } from 'reactstrap'
import useGetServices from '../../hooks/useGetServices'
import { useState } from 'react'

const Services = () => {
    const {
        services,
        getAllFullSetExtensions,
        getAllExtensionInfills,
        getAllEyebrows,
        // getAllLips,
        // getAllSMPU,
        loadingServices,
        servicesError
    } = useGetServices();

    const tabs = ['Full Set Extensions', 'Eyelash Extensions Infills', 'Eyebrows',];
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);


    return (
        <PageWrapper title="Services">
            <ImageBanner title='Our Beauty Services' />

            <section className='services__section'>
                <Container>
                    <Row className='gap-4'>
                        {/* {data.map(({ id, content }) => {
                            const { left, right } = content;
                            return (
                                <div key={id} className='mt-4'>
                                    <FeatureRow className=''
                                        leftChildren={id % 2 === 0 ? left : right}
                                        rightChildren={id % 2 !== 0 ? left : right}
                                    />
                                </div>
                            )
                        })} */}




                        {loadingServices
                            ?
                            <LoadingSpinner title="Loading..." />
                            :
                            (services?.length === 0 ?
                                <h1 className='text-center fs-4'>Sorry, No Lashes Here</h1>
                                :
                                <>
                                    <Form_RadioOptionGroup wrapperClassName='w-100' value={selectedTabIndex} options={tabs} onChange={setSelectedTabIndex} />
                                    {selectedTabIndex === 0 && (
                                        <div className='mb-4'>
                                            {/* <h1 className='category-header'>Full Set Extensions</h1> */}
                                            <ProductList items={getAllFullSetExtensions} />
                                        </div>
                                    )}
                                    {selectedTabIndex === 1 && (
                                        <div className='mb-4'>
                                            {/* <h1 className='category-header'>Eyelash Extensions Infills</h1> */}
                                            <ProductList items={getAllExtensionInfills} />
                                        </div>
                                    )}
                                    {selectedTabIndex === 2 && (
                                        <div className='mb-4'>
                                            {/* <h1 className='category-header'>Eyebrows</h1> */}
                                            <ProductList items={getAllEyebrows} />
                                        </div>
                                    )}


                                    {/* <div className='mb-4'>
                                        <h1 className='category-header'>Full Set Extensions</h1>
                                        <ProductList items={getAllFullSetExtensions} />
                                    </div>

                                    <div className='mb-4'>
                                        <h1 className='category-header'>Eyelash Extensions Infills</h1>
                                        <ProductList items={getAllExtensionInfills} />
                                    </div>

                                    <div className='mb-4'>
                                        <h1 className='category-header'>Eyebrows</h1>
                                        <ProductList items={getAllEyebrows} />
                                    </div> */}

                                    {/* <div className='mb-4'>
                                        <h1 className='category-header'>Lips</h1>
                                        <ProductList items={getAllLips} />
                                    </div>

                                    <div className='mb-4'>
                                        <h1 className='category-header'>Semi-Permanent Makeup</h1>
                                        <ProductList items={getAllSMPU} />
                                    </div> */}
                                </>
                                // <ProductList items={services} />
                            )
                        }
                    </Row>
                </Container>
            </section>
        </PageWrapper>
    )
}

export default Services