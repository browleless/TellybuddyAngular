import { Customer } from './customer';
export class FamilyGroup {
    familyGroupId: number;
    description: string;
    numberOfMembers: number;
    donatedUnits: number;
    discountRate: number;
    customers: Customer[];

    constructor(
        familyGroupId?: number,
        description?: string,
        numberOfMembers?: number,
        donatedUnits?: number,
        discountRate?: number,
        customers?: Customer[]
    ) {
        this.numberOfMembers = numberOfMembers;
        this.familyGroupId = familyGroupId;
        this.description = description;
        this.donatedUnits = donatedUnits;
        this.discountRate = discountRate;
        this.customers = customers;
    }
}
