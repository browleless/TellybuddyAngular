export class Plan {
    planId: number;
    totalBasicUnits: number;
    price: number;
    name: string;
    addOnPrice: number;
    dataConversionRate: number;
    smsConversionRate: number;
    talktimeConversionRate: number;
    startTime: Date;
    endTime: Date;
    isDisabled: boolean;
    isInUse: boolean;

    constructor(
        planId?: number,
        totalBasicUnits?: number,
        price?: number,
        name?: string,
        addOnPrice?: number,
        dataConversionRate?: number,
        smsConversionRate?: number,
        talktimeConversionRate?: number,
        startTime?: Date,
        endTime?: Date,
        isDisabled?: boolean,
        isInUse?: boolean
    ) {
        this.planId = planId;
        this.name = name;
        this.totalBasicUnits = totalBasicUnits;
        this.price = price;
        this.addOnPrice = addOnPrice;
        this.dataConversionRate = dataConversionRate;
        this.smsConversionRate = smsConversionRate;
        this.talktimeConversionRate = talktimeConversionRate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isDisabled = isDisabled;
        this.isInUse = isInUse;
    }
}
