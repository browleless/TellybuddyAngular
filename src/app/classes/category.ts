import { Product } from './product';

export class Category {
    categoryId: number;
    name: string;
    description: string;
    products: Product[];
    subCategories: Category[];
    parentCategory: Category;
    constructor(
        categoryId?: number,
        name?: string,
        description?: string,
        products?: Product[],
        subCategories?: Category[],
        parentCategory?: Category
    ) {
        this.categoryId = categoryId;
        this.name = name;
        this.description = description;
        this.products = products;
        this.subCategories = subCategories;
        this.parentCategory = parentCategory;
    }
}
