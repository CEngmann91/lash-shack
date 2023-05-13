import './Services.scss'
import { ArrowMotionButton, Form_RadioOptionGroup, ImageBanner, LoadingSpinner, PageWrapper, ProductList } from '../../components'
import { Container, Row } from 'reactstrap'
import useGetServices from '../../hooks/useGetServices'
import { useState } from 'react'
import { formatCurrency } from '../../res/funcs'
import { ProductItem } from '../../types/ProductItem'
import { Icon_Plane } from '../../res/icons'
import { launchTreatwell, scrollToTop, toHoursMins } from '../../util/util'

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
                {/* <div className="theader">{tabs[index]}</div> */}

                {list?.map(({ title, price, isOnSale, salePrice, duration }, key) => (
                    <div className='tContent' key={key} data-index={key}>
                        <div className='left'>
                            <p className="item-title">{title}</p>
                            <p className="item-subTitle">Duration: {toHoursMins(duration)}</p>
                        </div>

                        <div className='right'>
                            {!isOnSale ? (
                                <span className="price">{formatCurrency(price)}</span>
                            ) : (
                                <div className=''>
                                    <span className="sale-price">{formatCurrency(price)}</span>
                                    <span>&nbsp;/&nbsp;</span>
                                    {salePrice && (
                                        <span className="price">{formatCurrency(salePrice)}</span>
                                    )}
                                </div>
                            )}
                            <ArrowMotionButton className='cta-button' onClick={() => launchTreatwell('Romford')}>
                                View
                                {/* <Icon_Plane /> */}
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
                    services?.length === 0 ? (
                        <h1 className='text-center fs-4'>Sorry, No Lashes Here</h1>
                    ) : (
                        <div>
                            <Form_RadioOptionGroup wrapperClassName='radio-group-section w-100' value={selectedTabIndex} options={tabs}
                                onChange={value => {
                                    scrollToTop();
                                    setSelectedTabIndex(value);
                                }}
                            />

                            <div className="pricelist" data-tab={selectedTabIndex.toString()}>
                                <div className="title">
                                    <p>PRICE LISTS</p>
                                    <h3>Our<span> Pricing</span></h3>
                                </div>

                                {renderTable(selectedTabIndex)}
                            </div>
                        </div>
                    ))}
            </section>
        </PageWrapper>
    )
}

export default Services