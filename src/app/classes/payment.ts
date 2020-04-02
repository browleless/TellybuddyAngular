export class Payment {
    paymentId: number;
    creditCardNumber: string;
    cvv: string;
    datePaid: Date;
    amount: number;

    constructor(
        paymentId?: number,
        creditCardNumber?: string,
        cvv?: string,
        datePaid?: Date,
        amount?: number
    ) {
        this.paymentId = paymentId;
        this.creditCardNumber = creditCardNumber;
        this.cvv = cvv;
        this.datePaid = datePaid;
        this.amount = amount;
    }
}
