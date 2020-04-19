import { SubscriptionStatusEnum } from '../enum/subscription-status-enum';
import { Customer } from './customer';
import { UsageDetail } from './usage-detail';
import { Plan } from './plan';
import { PhoneNumber } from './phone-number';
import { Bill } from './bill';

export class Subscription {
    subscriptionId: number;
    dataUnits: Object;
    talkTimeUnits: Object;
    smsUnits: Object;
    subscriptionStatusEnum: SubscriptionStatusEnum;
    isActive: boolean;
    subscriptionStartDate: Date;
    subscriptionEndDate: Date;
    customer: Customer;
    usageDetails: UsageDetail[];
    plan: Plan;
    phoneNumber: PhoneNumber;
    outstandingBills: Bill[];
    constructor(
        subscriptionId?: number,
        dataUnits?: Object,
        talkTimeUnits?: Object,
        smsUnits?: Object,
        subscriptionStatusEnum?: SubscriptionStatusEnum,
        isActive?: boolean,
        subscriptionStartDate?: Date,
        subscriptionEndDate?: Date,
        customer?: Customer,
        usageDetails?: UsageDetail[],
        plan?: Plan,
        phoneNumber?: PhoneNumber,
        outstandingBills?: Bill[]
    ) {
        this.subscriptionId = subscriptionId;
        this.dataUnits = dataUnits;
        this.talkTimeUnits = talkTimeUnits;
        this.smsUnits = smsUnits;
        this.subscriptionEndDate = subscriptionEndDate;
        this.subscriptionStatusEnum = subscriptionStatusEnum;
        this.isActive = isActive;
        this.subscriptionStartDate = subscriptionStartDate;
        this.customer = customer;
        this.usageDetails = usageDetails;
        this.plan = plan;
        this.phoneNumber = phoneNumber;
        this.outstandingBills = outstandingBills;
    }
}
