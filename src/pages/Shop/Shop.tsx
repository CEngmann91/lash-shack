import './Shop.scss';
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { LoadingSpinner, PageWrapper, ProductList } from '../../components'
import ImageBanner from '../../components/UI/ImageBanner/ImageBanner'
import { Container, Col, Row } from 'reactstrap';
import { Icon_Search } from '../../res/icons';
import { ProductItem } from '../../types/ProductItem';
import useGetCatalog from '../../hooks/useGetCatalog';
import useGetCourses from '../../hooks/useGetCourses';
import useGetServices from '../../hooks/useGetServices';
import useGetProducts from '../../hooks/useGetProducts';

const Shop = () => {
    const { items, loadingProducts, productsError } = useGetProducts();
    const { courses, loadingCourses, coursesError } = useGetCourses();
    const { services, loadingServices, servicesError } = useGetServices();

    const { catalog, loading, error } = useGetCatalog();

    const searchInputRef = useRef<HTMLInputElement>(null);
    const [products, setProducts] = useState(catalog);




    useEffect(() => {
        if (products.length === 0) setProducts(catalog);

    }, [loading])





    function onSearchIconClick() {
        searchInputRef.current?.focus();
    };

    function handleFilter(e: ChangeEvent<HTMLSelectElement>) {
        const filterValue = e.target.value;
        // Revert back to all listings.
        if (filterValue === "default")
            setProducts(catalog);
        if (filterValue === "courses") {
            // const filteredProducts = productListing.filter(item => item.category === "Courses")
            // setProducts(filteredProducts);



            // Sort by highest price then assign the products to be displayed.
            const filteredProducts = catalog?.sort((a, b) => b.price - a.price) as ProductItem[];
            setProducts(filteredProducts);



        }
        if (filterValue === "servicesAll") {
            const filteredProducts = catalog?.filter(item => item.category === "Services")
            setProducts(filteredProducts);
        }
        if (filterValue === "servicesEEFS") {
            const filteredProducts = catalog?.filter(item => item.category === "Services" && item.subServiceCategory === "Eyelash Extensions Full Sets")
            setProducts(filteredProducts);
        }
        if (filterValue === "servicesEEI") {
            const filteredProducts = catalog?.filter(item => item.category === "Services" && item.subServiceCategory === "Eyelash Extensions Infills")
            setProducts(filteredProducts);
        }
        if (filterValue === "servicesE") {
            const filteredProducts = catalog?.filter(item => item.category === "Services" && item.subServiceCategory === "Eyebrows")
            setProducts(filteredProducts);
        }
        // if (filterValue === "servicesL") {
        //     const filteredProducts = catalog?.filter(item => item.category === "Services" && item.subServiceCategory === "Lips")
        //     setProducts(filteredProducts);
        // }
        // if (filterValue === "servicesSMPU") {
        //     const filteredProducts = catalog?.filter(item => item.category === "Services" && item.subServiceCategory === "Semi-Permanent Makeup")
        //     setProducts(filteredProducts);
        // }
    }

    function handleSort(e: ChangeEvent<HTMLSelectElement>) {
        const sortValue = e.target.value;
        console.log(sortValue);


        // Revert back to all listings.
        // if (sortValue === "default")
        // setProducts(productListing);
        if (sortValue === "ascending") {

            const sortedProducts = [...products].sort((a, b) => a.title.localeCompare(b.title));
            setProducts(sortedProducts);
        }
        if (sortValue === "descending") {
            const sortedProducts = [...products].sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
            setProducts(sortedProducts);
        }
        if (sortValue === "lowest-price-first") {
            const sortedProducts = [...products].sort((a, b) => a.price - b.price);
            setProducts(sortedProducts);
        }
        if (sortValue === "highest-price-first") {
            const sortedProducts = [...products].sort((a, b) => b.price - a.price);
            setProducts(sortedProducts);
        }
        // if (sortValue === "location") {

        // }
    }

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        const query = e.target.value;
        const queriedProducts = catalog.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
        setProducts(queriedProducts);
    }


    return (
        <PageWrapper title="Shop">
            <ImageBanner title={"Let's go SHOPPING!"} />

            <section>
                <Container>
                    <Row>
                        <Col lg='4' md='6'>
                            <div className="filter__widget">
                                <select onChange={handleFilter}>
                                    <option value="empty">Filter By Type</option>
                                    <option value="default">Show All</option>
                                    <option value="courses">Courses</option>
                                    <option value="servicesAll">Services (All)</option>
                                    <option value="servicesEEFS">Services - Eyelash Extensions Full Sets</option>
                                    <option value="servicesEEI">Services - Eyelash Extensions Infills</option>
                                    <option value="servicesE">Services - Eyebrows</option>
                                    {/* <option value="servicesL">Services - Lips</option>
                                    <option value="servicesSMPU">Services - Semi-Permanent Makeup</option> */}
                                    {/* <option value=""></option> */}
                                    {/* <option value=""></option> */}
                                </select>
                            </div>
                        </Col>

                        <Col lg='3' md='6' className='text-end'>
                            <div className="filter__widget">
                                <select onChange={handleSort}>
                                    <option value="default">Sort By</option>
                                    <option value="ascending">Ascending</option>
                                    <option value="descending">Descending</option>
                                    <option value="lowest-price-first">Lowest Price First</option>
                                    <option value="highest-price-first">Highest Price First</option>
                                    {/* <option value="location">Location (Preferred)</option> */}
                                    {/* <option value=""></option> */}
                                    {/* <option value=""></option> */}
                                </select>
                            </div>
                        </Col>

                        <Col lg='4' md='12'>
                            <div className="search__box">
                                <input type="text" placeholder='Search By Name' ref={searchInputRef} onChange={handleSearch} />
                                <span onClick={onSearchIconClick}><Icon_Search /></span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>


            <section className='pt-0'>
                <Container>
                    <Row>
                        {loadingProducts
                            ?
                            <LoadingSpinner title="Loading..." />
                            :
                            (items && items?.length === 0 ?
                                <h1 className='text-center fs-4'>Sorry, No Lashes Here</h1>
                                :
                                (JSON.stringify(items, null, 2))


                                // <>
                                //     <div className='mb-4'>
                                //         <h1 className='category-header'>Courses</h1>
                                //         <ProductList items={courses} />
                                //     </div>

                                //     <div className='mt-4'>
                                //         <h1 className='category-header'>Services</h1>
                                //         <ProductList items={services} />
                                //     </div>
                                // </>

                                // <ProductList items={items as ProductItem[]} />
                                // <h1>{items?.length.toString()}</h1>
                            )
                        }
                    </Row>
                </Container>
            </section>
        </PageWrapper>
    )
}

export default Shop