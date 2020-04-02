import { Transaction } from './transaction';

export class DiscountCode {
    discountCodeId: number;
    discountCode: string;
    discountRate: number;
    expiryDate: Date;
    transaction: Transaction;
    constructor(
        discountCodeId?: number,
        discountCode?: string,
        discountRate?: number,
        expiryDate?: Date,
        transaction?: Transaction
    ) {
        this.discountCodeId = discountCodeId;
        this.discountCode = discountCode;
        this.discountRate = discountRate;
        this.expiryDate = expiryDate;
        this.transaction = transaction;
    }
}
