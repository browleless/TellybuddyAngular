import { Subscription } from './subscription';

export class PhoneNumber {
    phoneNumberId: number;
    phoneNumber: string;
    inUse: boolean;
    subscription: Subscription;

    constructor(
        phoneNumberId?: number,
        phoneNumber?: string,
        inUse?: boolean,
        subscription?: Subscription
    ) {
        this.inUse = inUse;
        this.phoneNumberId = phoneNumberId;
        this.phoneNumber = phoneNumber;
        this.subscription = subscription;
    }
}
