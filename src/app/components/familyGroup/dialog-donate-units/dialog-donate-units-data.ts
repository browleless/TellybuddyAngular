import { Customer } from 'src/app/classes/customer';
import { Subscription } from 'src/app/classes/subscription';
import { FamilyGroup } from 'src/app/classes/family-group';

export interface DialogDonateUnitsData {
    currentCustomer: Customer;
    currentCustomerSubscription: Subscription[];
    currentFamilyGroup: FamilyGroup;
}
