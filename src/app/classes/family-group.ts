import { Customer } from './customer';
export class FamilyGroup {
    familyGroupId: number;
    description: string;
    numberOfMembers: number;
    donatedDataUnits: number;
    donatedSMSUnits: number;
    donatedTalkTimeUnits: number;
    discountRate: number;
    customers: Customer[];

    constructor(
        familyGroupId?: number,
        description?: string,
        numberOfMembers?: number,
        donatedDataUnits?: number,
        donatedTalkTimeUnits?: number,
        donatedSMSUnits?: number,
        discountRate?: number,
        customers?: Customer[]
    ) {
        this.numberOfMembers = numberOfMembers;
        this.familyGroupId = familyGroupId;
        this.description = description;
        this.donatedDataUnits = donatedDataUnits;
        this.donatedSMSUnits = donatedSMSUnits;
        this.donatedTalkTimeUnits = donatedTalkTimeUnits;
        this.discountRate = discountRate;
        this.customers = customers;
    }
}
