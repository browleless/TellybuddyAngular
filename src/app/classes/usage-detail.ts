import { Bill } from './bill';
import { Subscription } from './subscription';

export class UsageDetail {
    usageDetailId: number;
    talktimeUsage: number;
    smsUsage: number;
    dataUsage: number;
    startDate: string;
    endDate: string;
    bill: Bill;
    subscription: Subscription;
    allowedTalktimeUsage: number;
    allowedSmsUsage: number;
    allowedDataUsage: number;

    constructor(
        usageDetailId?: number,
        talktimeUsage?: number,
        smsUsage?: number,
        dataUsage?: number,
        startDate?: string,
        endDate?: string,
        bill?: Bill,
        subscription?: Subscription,
        allowedTalktimeUsage?: number,
        allowedSmsUsage?: number,
        allowedDataUsage?: number
    ) {
        this.usageDetailId = usageDetailId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.subscription = subscription;
        this.bill = bill;
        this.talktimeUsage = talktimeUsage;
        this.smsUsage = smsUsage;
        this.dataUsage = dataUsage;
        this.allowedTalktimeUsage = allowedTalktimeUsage;
        this.allowedSmsUsage = allowedSmsUsage;
        this.allowedDataUsage = allowedDataUsage;
    }
}
