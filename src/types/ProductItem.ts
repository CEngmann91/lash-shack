import { Category } from "./Category";
import { Review } from "./Review";
import { ServiceCategory } from "./ServiceCategory";

export type ProductItem = {
    id: string;
    imgUrl: string;
    title: string;
    category: Category;
    subServiceCategory: ServiceCategory;
    price: number;
    shortDesc: string;
    description: string;
    reviews: Review[],
    upcomingDates: string[]
}