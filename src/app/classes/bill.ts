import { Payment } from './payment';
import { Customer } from './customer';
import { UsageDetail } from './usage-detail';

export class Bill {
    billId: number;
    price: number;
    familyDiscountRate: number;
    addOnPrice: number;
    exceedPenaltyPrice: number;
    earlyTerminationFee?: number;
    date: Date;
    paid: boolean;
    payment: Payment;
    customer: Customer;
    usageDetail: UsageDetail;
    constructor(
        billId?: number,
        price?: number,
        familyDiscountRate?: number,
        addOnPrice?: number,
        exceedPenaltyPrice?: number,
        earlyTerminationFee?: number,
        date?: Date,
        paid?: boolean,
        payment?: Payment,
        customer?: Customer,
        usageDetail?: UsageDetail
    ) {
        this.price = price;
        this.date = date;
        this.addOnPrice = addOnPrice;
        this.exceedPenaltyPrice = exceedPenaltyPrice;
        this.familyDiscountRate = familyDiscountRate;
        this.earlyTerminationFee = earlyTerminationFee;
        this.billId = billId;
        this.paid = paid;
        this.payment = payment;
        this.customer = customer;
        this.usageDetail = usageDetail;
    }
}
