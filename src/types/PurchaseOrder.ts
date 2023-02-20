import { PurchaseOrderItem } from "./PurchaseOrderItem";

export type PurchaseOrder = {
    id: string;
    customerID: string;
    products: PurchaseOrderItem[];
    date: string;
    time: string;
    total: number;
}