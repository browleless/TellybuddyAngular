import { Payment } from './payment';
import { Customer } from './customer';
import { DiscountCode } from './discount-code';
import { TransactionLineItem } from './transaction-line-item';

export class Transaction {
    transactionId: number;
    totalPrice: number;
    voidRefund: boolean;
    transactionDateTime: Date;
    payment: Payment;
    customer: Customer;
    discountCode: DiscountCode;
    transactionLineItems: TransactionLineItem[];
    constructor(
        transactionId?: number,
        totalPrice?: number,
        voidRefund?: boolean,
        transactionDateTime?: Date,
        payment?: Payment,
        customer?: Customer,
        discountCode?: DiscountCode,
        transactionLineItems?: TransactionLineItem[]
    ) {
        this.transactionId = transactionId;
        this.voidRefund = voidRefund;
        this.payment = payment;
        this.customer = customer;
        this.discountCode = discountCode;
        this.transactionLineItems = transactionLineItems;
        this.totalPrice = totalPrice;
        this.transactionDateTime = transactionDateTime;
        this.voidRefund = false;
    }
}
