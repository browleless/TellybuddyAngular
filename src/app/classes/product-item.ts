import { LuxuryProduct } from './luxury-product';

export class ProductItem {
    productItemId: number;
    serialNumber: string;
    price: number;
    luxuryProduct: LuxuryProduct;
    constructor(
        productItemId?: number,
        serialNumber?: string,
        price?: number,
        luxuryProduct?: LuxuryProduct
    ) {
        this.productItemId = productItemId;
        this.serialNumber = serialNumber;
        this.price = price;
        this.luxuryProduct = luxuryProduct;
    }
}
