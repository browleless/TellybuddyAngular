import { Tag } from './tag';
import { Category } from './category';

export class Product {
    productId: number;
    skuCode: string;
    name: string;
    description: string;
    price: number;
    quantityOnHand: number;
    reorderQuantity: number;
    productImagePath: string;
    tags: Tag[];
    category: Category;
    dealStartTime: Date;
    dealEndTime: Date;
    discountPrice: number;
    constructor(
        productId?: number,
        skuCode?: string,
        name?: string,
        description?: string,
        price?: number,
        quantityOnHand?: number,
        reorderQuantity?: number,
        productImagePath?: string,
        tags?: Tag[],
        category?: Category,
        dealStartTime?: Date,
        dealEndTime?: Date,
        discountPrice?: number
    ) {
        this.skuCode = skuCode;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantityOnHand = quantityOnHand;
        this.reorderQuantity = reorderQuantity;
        this.productImagePath = productImagePath;
        this.tags = tags;
        this.productId = productId;
        this.category = category;
        this.dealEndTime = dealEndTime;
        this.dealStartTime = dealStartTime;
        this.discountPrice = discountPrice;
    }
}
