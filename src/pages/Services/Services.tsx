import './Services.scss'
import { ArrowMotionButton, Form_RadioOptionGroup, ImageBanner, LoadingSpinner, PageWrapper } from '../../components'
import useGetServices from '../../hooks/useGetServices'
import { useCallback, useRef, useState } from 'react'
import { ProductItem } from '../../types/ProductItem'
import { launchTreatwell, scrollToTop, toHoursMins } from '../../util/util'
import { formatCurrency } from '../../util/formatCurrency'
import { AestheticCategory } from '../../types/AestheticCategory'

const launchTreatwellRomford = () => launchTreatwell('Romford');

const Services = () => {
    const {
        services,
        getAllFullSetExtensions,
        getAllExtensionInfills,
        getAllAesthetics,
        getAllEyebrows,
        // getAllLips,
        // getAllSMPU,
        loadingServices,
    } = useGetServices();

    const tabs = ['Full Set Extensions', 'Eyelash Extensions Infills', 'Aesthetics', 'Eyebrows',];
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const lastAestheticCategory = useRef<AestheticCategory | null>(null);



    const getAllAestheticsCategory = useCallback((value: AestheticCategory) => {
        if (value === lastAestheticCategory.current) {
            return null;
        }
        lastAestheticCategory.current = value;
        return value;
    }, []);


    const renderTable = (index: number) => {
        let list: ProductItem[] = [];
        switch (index) {
            case 0:
                list = getAllFullSetExtensions;
                break;
            case 1:
                list = getAllExtensionInfills;
                break;
            case 2:
                list = getAllAesthetics;
                break;
            case 3:
                list = getAllEyebrows;
                break;
            default:
                break;
        }

        return (
            <div className='ttable'>
                {list?.map(({ id, title, price, isOnSale, salePrice, duration, aestheticCategory }) => {
                    const isAesthetics = selectedTabIndex === 2 && typeof aestheticCategory === 'string';
                    const aestheticChanged = isAesthetics && aestheticCategory !== lastAestheticCategory.current;

                    return (
                        <div>
                            {aestheticChanged && (
                                <p className='aestheticCategory'>{getAllAestheticsCategory(aestheticCategory)}</p>
                            )}
                            <div className='tContent' key={id} data-index={id}>
                                <div className='left'>
                                    <p className="item-title">{title}</p>
                                    {!isAesthetics && (
                                        <p className="item-subTitle">Duration: {toHoursMins(duration)}</p>
                                    )}
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
                                    {selectedTabIndex !== 2 && (
                                        <ArrowMotionButton className='cta-button' onClick={launchTreatwellRomford}>
                                            View
                                            {/* <Icon_Plane /> */}
                                        </ArrowMotionButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
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