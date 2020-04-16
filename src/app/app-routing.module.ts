import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PlansComponent } from './components/plans/plans.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { EarnAdditionalUnitsComponent } from './components/earn-additional-units/earn-additional-units.component';
import { QuizAttemptComponent } from './components/quiz-attempt/quiz-attempt.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';

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
    { path: 'subscriptions', component: SubscriptionsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'additionalUnits', component: EarnAdditionalUnitsComponent },
    { path: 'additionalUnits/:quizId', component: QuizAttemptComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
