import { Product } from './product';

export class Tag {
    tagId: number;
    name: string;
    products: Product[];
    constructor(tagId?: number, name?: string, products?: Product[]) {
        this.tagId = tagId;
        this.name = name;
        this.products = products;
    }
}
