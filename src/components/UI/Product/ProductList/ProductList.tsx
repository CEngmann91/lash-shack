import React from 'react'
import { Container, Row } from 'reactstrap'
import { ProductItem } from '../../../../types/ProductItem';
import ProductCard from '../ProductCard/ProductCard'

type ProductListProps = {
    items: ProductItem[];
}
const ProductList = ({ items }: ProductListProps) => {

    return (
        <Container>
            <Row>
                {items?.map(({ id, imgUrl, title, category, subServiceCategory, price, shortDesc, description, reviews, upcomingDates }, key) =>
                    <ProductCard
                        key={key}
                        imgUrl={imgUrl}
                        title={title}
                        category={category}
                        subServiceCategory={subServiceCategory}
                        price={price}
                        id={id}
                        shortDesc={shortDesc}
                        description={description}
                        reviews={reviews}
                        upcomingDates={upcomingDates}
                    />
                )}
            </Row>
        </Container>
    )
}

export default ProductList