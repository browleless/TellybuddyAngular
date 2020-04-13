import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PlansComponent } from './components/plans/plans.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

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
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
