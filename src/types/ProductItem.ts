import { Category } from "./Category";
import { Review } from "./Review";
import { ServiceCategory } from "./ServiceCategory";

export type ProductItem = {
    id: string;
    active: boolean;
    imgUrl: string;
    title: string;
    category: Category;
    subServiceCategory: ServiceCategory;
    price: number;
    isOnSale: boolean;
    salePrice: number;
    shortDesc: string;
    description: string;
    duration: number;
    reviews: Review[],
    upcomingDates: string[]
}