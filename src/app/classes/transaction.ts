import { Payment } from './payment';
import { Customer } from './customer';
import { DiscountCode } from './discount-code';
import { TransactionLineItem } from './transaction-line-item';
import { TransactionStatusEnum } from '../enum/transaction-status-enum';

export class Transaction {
    transactionId: number;
    totalPrice: number;
    voidRefund: boolean;
    transactionDateTime: Date;
    transactionStatusEnum: TransactionStatusEnum;
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
        transactionLineItems?: TransactionLineItem[],
        transactionStatusEnum?: TransactionStatusEnum
    ) {
        this.transactionId = transactionId;
        this.voidRefund = voidRefund;
        this.payment = payment;
        this.customer = customer;
        this.discountCode = discountCode;
        this.transactionLineItems = transactionLineItems;
        this.totalPrice = totalPrice;
        this.transactionDateTime = transactionDateTime;
        this.transactionStatusEnum = transactionStatusEnum;
        this.voidRefund = false;
    }
}
