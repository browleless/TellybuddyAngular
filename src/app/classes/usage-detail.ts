import { Bill } from './bill';
import { Subscription } from './subscription';

export class UsageDetail {
    usageDetailId: number;
    talktimeUsage: number;
    smsUsage: number;
    dataUsage: number;
    startDate: Date;
    endDate: Date;
    bill: Bill;
    subscription: Subscription;
    constructor(
        usageDetailId?: number,
        talktimeUsage?: number,
        smsUsage?: number,
        dataUsage?: number,
        startDate?: Date,
        endDate?: Date,
        bill?: Bill,
        subscription?: Subscription
    ) {
        this.usageDetailId = usageDetailId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.subscription = subscription;
        this.bill = bill;
        this.talktimeUsage = talktimeUsage;
        this.smsUsage = smsUsage;
        this.dataUsage = dataUsage;
    }
}
