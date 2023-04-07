import { Review } from "./Review";

export type SalesProduct = {
    id: string;
    active: boolean;
    imgUrl: string;
    title: string;
    price: number;
    // isOnSale: boolean;
    // salePrice: number;
    description: string;
    // reviews: Review[];
    dateCreated?: string;
}