import './Services.scss'
import { ArrowMotionButton, Form_RadioOptionGroup, ImageBanner, LoadingSpinner, PageWrapper, ProductList } from '../../components'
import { Container, Row } from 'reactstrap'
import useGetServices from '../../hooks/useGetServices'
import { useState } from 'react'
import { formatCurrency, launchTreatwell } from '../../res/funcs'
import { ProductItem } from '../../types/ProductItem'

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
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);






    function formatTime(seconds: number) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.round(seconds % 60);
        return [
            h,
            m > 9 ? m : (h ? '0' + m : m || '0'),
            s > 9 ? s : '0' + s
        ].filter(Boolean).join(':');
    }

    const renderTable = (index: number) => {
        let list: ProductItem[] = [];
        if (index == 0)
            list = getAllFullSetExtensions;
        else if (index == 1)
            list = getAllExtensionInfills;
        else if (index == 2)
            list = getAllEyebrows;

        return (
            <div className='ttable'>
                <div className="theader">{tabs[index]}</div>

                {list?.map(({ title, price, isOnSale, salePrice, duration }, key) => (
                    <div className='tContent' key={key}>
                        <div className='left'>
                            <p className="item-title">{title}</p>
                            <p className="item-subTitle">Duration: {formatTime(duration)}</p>
                        </div>

                        <div className='right'>
                            {!isOnSale ?
                                <span className="price">{formatCurrency(price)}</span>
                                :
                                <div className=''>
                                    <span className="sale-price">{formatCurrency(price)}</span>
                                    <span>&nbsp;/&nbsp;</span>
                                    {salePrice &&
                                        <span className="price">{formatCurrency(salePrice)}</span>
                                    }
                                </div>
                            }
                            <ArrowMotionButton className='cta-button' onClick={launchTreatwell}>
                                View
                            </ArrowMotionButton>
                        </div>
                    </div>
                ))}
            </div>
        );
    }



    return (
        <PageWrapper title="Services">
            <ImageBanner title='Our Beauty Services' />

            <section className='services__section'>
                {loadingServices ? (
                    <LoadingSpinner title="Loading..." />
                ) : (
                    services?.length === 0 ?
                        <h1 className='text-center fs-4'>Sorry, No Lashes Here</h1>
                        :
                        <div>
                            <Form_RadioOptionGroup wrapperClassName='radio-group-section w-100' value={selectedTabIndex} options={tabs} onChange={setSelectedTabIndex} />

                            <div className="pricelist">
                                <div className="title">
                                    <p>PRICE LISTS</p>
                                    <h3>Our<span> Pricing</span></h3>
                                </div>

                                {renderTable(selectedTabIndex)}
                            </div>
                        </div>
                )}
            </section>
        </PageWrapper>
    )



    // return (
    //     <PageWrapper title="Services">
    //         <ImageBanner title='Our Beauty Services' />

    //         <section className='services__section'>
    //             <Container>
    //                 <Row className='gap-4'>
    //                     {/* {data.map(({ id, content }) => {
    //                         const { left, right } = content;
    //                         return (
    //                             <div key={id} className='mt-4'>
    //                                 <FeatureRow className=''
    //                                     leftChildren={id % 2 === 0 ? left : right}
    //                                     rightChildren={id % 2 !== 0 ? left : right}
    //                                 />
    //                             </div>
    //                         )
    //                     })} */}




    //                     {loadingServices
    //                         ?
    //                         <LoadingSpinner title="Loading..." />
    //                         :
    //                         (services?.length === 0 ?
    //                             <h1 className='text-center fs-4'>Sorry, No Lashes Here</h1>
    //                             :
    //                             <>
    //                                 <Form_RadioOptionGroup wrapperClassName='w-100' value={selectedTabIndex} options={tabs} onChange={setSelectedTabIndex} />

    //                                 {/* {selectedTabIndex === 0 && (
    //                                     <div className='mb-4'>
    //                                         <ProductList items={getAllFullSetExtensions} />
    //                                     </div>
    //                                 )}
    //                                 {selectedTabIndex === 1 && (
    //                                     <div className='mb-4'>
    //                                         <ProductList items={getAllExtensionInfills} />
    //                                     </div>
    //                                 )}
    //                                 {selectedTabIndex === 2 && (
    //                                     <div className='mb-4'>
    //                                         <ProductList items={getAllEyebrows} />
    //                                     </div>
    //                                 )} */}















    //                                 {/* <div className="pricing">
    //                                     <div className="pricing__unique1">
    //                                         <p>PRICE LISTS</p>
    //                                         <h3>Our<span> Pricing</span></h3>
    //                                     </div>

    //                                     <div className="pricing__unique2">Main Courses</div>

    //                                     <div className="pricing__unique3">
    //                                         <div>
    //                                             <p className="pricing__unique4">Special Yummy Pizza</p>
    //                                             <p className="pricing__unique5">Lorem ipsum, dolor sit amet consectetur</p>
    //                                         </div>

    //                                         <span>$6.50</span>
    //                                     </div>
    //                                     <hr />
    //                                     <div className="pricing__unique6">
    //                                         <div>
    //                                             <p className="pricing__unique7">Special Yummy Pizza</p>
    //                                             <p className="pricing__unique8">Lorem ipsum, dolor sit amet consectetur</p>
    //                                         </div>

    //                                         <span>$6.50</span>
    //                                     </div>
    //                                     <hr />
    //                                     <div className="pricing__unique9">
    //                                         <div>
    //                                             <p className="pricing__unique10">Special Yummy Pizza</p>
    //                                             <p className="pricing__unique11">Lorem ipsum, dolor sit amet consectetur</p>
    //                                         </div>

    //                                         <span>$6.50</span>
    //                                     </div>


    //                                     <div className="pricing__unique12">salad</div>

    //                                     <div className="pricing__unique13">
    //                                         <div>
    //                                             <p className="pricing__unique14">House Salad</p>
    //                                             <p className="pricing__unique15">Lorem ipsum, dolor sit amet consectetur</p>
    //                                         </div>

    //                                         <span>$6.50</span>
    //                                     </div>
    //                                     <hr />
    //                                     <div className="pricing__unique16">
    //                                         <div>
    //                                             <p className="pricing__unique17">House Salad</p>
    //                                             <p className="pricing__unique18">Lorem ipsum, dolor sit amet consectetur</p>
    //                                         </div>

    //                                         <span>$6.50</span>
    //                                     </div>
    //                                 </div> */}




    //                             </>
    //                         )
    //                     }
    //                 </Row>
    //             </Container>
    //         </section>
    //     </PageWrapper>
    // )
}

export default Services