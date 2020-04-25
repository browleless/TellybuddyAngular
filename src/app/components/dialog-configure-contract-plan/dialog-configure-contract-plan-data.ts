import { Plan } from 'src/app/classes/plan';
import { Product } from 'src/app/classes/product';

export interface DialogConfigureContractPlanData {
    selectedPlan: Plan;
    selectedProduct: Product;
}
