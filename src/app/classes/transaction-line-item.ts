import { Transaction } from './transaction';
import { Subscription } from './subscription';
import { ProductItem } from './product-item';
import { Product } from './product';

export class TransactionLineItem {
    transactionLineItemId: number;
    price: number;
    quantity: number;
    subtotal: number;
    transaction: Transaction;
    subscription: Subscription;
    productItem: ProductItem;
    product: Product;
    constructor(
        price?: number,
        quantity?: number,
        subtotal?: number,
        subscription?: Subscription,
        productItem?: ProductItem,
        product?: Product
    ) {
        this.price = price;
        this.quantity = quantity;
        this.subtotal = subtotal;
        this.subscription = subscription;
        this.productItem = productItem;
        this.product = product;
    }
}
