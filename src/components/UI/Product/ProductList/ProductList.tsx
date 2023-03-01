import { Container, Row } from 'reactstrap'
import { ProductItem } from '../../../../types/ProductItem';
import ProductCard from '../ProductCard/ProductCard'

type ProductListProps = {
    items: ProductItem[];
}
const ProductList = ({ items }: ProductListProps) => {

    return (
        <Container>
            <Row className='d-flex justify-content-center gap-3'>
                {items?.map((item, key) => {
                    const { active } = item;

                    if (!active)
                        return null;

                    return <ProductCard key={key} item={item}/>
                })}
            </Row>
        </Container>
    )
}

export default ProductList