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
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
