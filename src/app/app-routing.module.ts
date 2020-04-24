import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PlansComponent } from './components/plans/plans.component';
import { ViewMembersComponent } from './components/familyGroup/view-members/view-members.component';
import { ViewSettingsComponent } from './components/familyGroup/view-settings/view-settings.component';
import { ViewFamilyGroupDetailsComponent } from './components/familyGroup/view-family-group-details/view-family-group-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MemberDetailsComponent } from './components/familyGroup/member-details/member-details.component';
import { ProductsComponent } from './components/products/products.component';
import { LuxuryproductsComponent } from './components/luxuryproducts/luxuryproducts.component';
import { EarnAdditionalUnitsComponent } from './components/earn-additional-units/earn-additional-units.component';
import { QuizAttemptComponent } from './components/quiz-attempt/quiz-attempt.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { AccountComponent } from './components/account/account.component';
import { ViewTransactionComponent } from './components/transaction-view/transaction-view.component';
import { BillsComponent } from './components/bills/bills.component';
import { BundlePlansComponent } from './components/bundle-plans/bundle-plans.component';
import { ViewAllProductsComponent } from './components/view-all-products/view-all-products.component';
import { PromotionsComponent } from './components/promotions/promotions.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full',
    },
    { path: 'index', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: 'resetPassword/:salt', component: ResetPasswordComponent },
    { path: 'plans', component: PlansComponent },
    {
        path: 'familyGroup/viewFamilyGroupDetails',
        component: ViewFamilyGroupDetailsComponent,
    },
    {
        path: 'familyGroup/viewMembers',
        component: ViewMembersComponent,
    },
    {
        path: 'familyGroup/memberDetails/:customerId',
        component: MemberDetailsComponent,
    },
    { path: 'familyGroup/viewSettings', component: ViewSettingsComponent },
    { path: 'subscriptions', component: SubscriptionsComponent },
    { path: 'account', component: AccountComponent },
    {
        path: 'transaction-view/:transactionId',
        component: ViewTransactionComponent,
    },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'luxuryproducts', component: LuxuryproductsComponent },
    { path: 'additionalUnits', component: EarnAdditionalUnitsComponent },
    { path: 'additionalUnits/:quizId', component: QuizAttemptComponent },
    { path: 'bills', component: BillsComponent },
    { path: 'bundlePlans/:productId', component: BundlePlansComponent },
    { path: 'viewallproducts', component: ViewAllProductsComponent },
    { path: 'promotions', component: PromotionsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
