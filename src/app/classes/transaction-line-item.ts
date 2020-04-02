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
        transactionLineItemId?: number,
        price?: number,
        quantity?: number,
        subtotal?: number,
        transaction?: Transaction,
        subscription?: Subscription,
        productItem?: ProductItem,
        product?: Product
    ) {
        this.transactionLineItemId = transactionLineItemId;
        this.price = price;
        this.quantity = quantity;
        this.subtotal = subtotal;
        this.transaction = transaction;
        this.subscription = subscription;
        this.productItem = productItem;
        this.product = product;
    }
}
