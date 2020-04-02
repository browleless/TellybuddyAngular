import { Product } from './product';
import { ProductItem } from './product-item';

export class LuxuryProduct extends Product {
    serialNumber: string;
    productItems: ProductItem[];
    constructor(serialNumber?: string, productItems?: ProductItem[]) {
        super();
        this.serialNumber = serialNumber;
        this.productItems = productItems;
    }
}
