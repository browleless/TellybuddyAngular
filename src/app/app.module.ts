import 'hammerjs';
import {
    BrowserModule,
    HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestureConfig } from '@angular/material';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DialogForgotPasswordComponent } from './components/dialog-forgot-password/dialog-forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PlansComponent } from './components/plans/plans.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { CartComponent } from './components/cart/cart.component';
import { DialogConfigureNewPlanComponent } from './components/dialog-configure-new-plan/dialog-configure-new-plan.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AccountComponent } from './components/account/account.component';
import { ViewTransactionComponent } from './components/transaction-view/transaction-view.component';
import { QuizAttemptComponent } from './components/quiz-attempt/quiz-attempt.component';

import { NumberDirective } from './directive/number.directive';
import { ProductsComponent } from './components/products/products.component';
import { LuxuryproductsComponent } from './components/luxuryproducts/luxuryproducts.component';
import { EarnAdditionalUnitsComponent } from './components/earn-additional-units/earn-additional-units.component';
import { DialogAllocateAdditionalUnitsComponent } from './components/dialog-allocate-additional-units/dialog-allocate-additional-units.component';
import { DialogRecommendPlansComponent } from './components/dialog-recommend-plans/dialog-recommend-plans.component';
import { DialogAmendSubscriptionUnits } from './components/dialog-amend-subscription-units/dialog-amend-subscription-units.component';
import { DialogAddonSubscriptionUnits } from './components/dialog-addon-subscription-units/dialog-addon-subscription-units.component';

import { BillsComponent } from './components/bills/bills.component';
import { DialogBillPaymentComponent } from './components/dialog-bill-payment/dialog-bill-payment.component';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        NavbarComponent,
        LoginComponent,
        DialogForgotPasswordComponent,
        ResetPasswordComponent,
        PlansComponent,
        SubscriptionsComponent,
        CartComponent,
        DialogConfigureNewPlanComponent,
        CheckoutComponent,
        NumberDirective,
        ProductsComponent,
        LuxuryproductsComponent,
        EarnAdditionalUnitsComponent,
        QuizAttemptComponent,
        AccountComponent,
        ViewTransactionComponent,
        DialogAllocateAdditionalUnitsComponent,
        DialogRecommendPlansComponent,
        DialogAmendSubscriptionUnits,
        DialogAddonSubscriptionUnits,
        BillsComponent,
        DialogBillPaymentComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatSnackBarModule,
        MatDialogModule,
        MatGridListModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        MatBadgeModule,
        MatTableModule,
        MatChipsModule,
        MatSliderModule,
        MatSidenavModule,
        MatDividerModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatRadioModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatListModule,
        MatStepperModule,
        MatTooltipModule,
        MatPaginatorModule,
    ],
    entryComponents: [
        DialogForgotPasswordComponent,
        DialogConfigureNewPlanComponent,
        DialogAllocateAdditionalUnitsComponent,
        DialogRecommendPlansComponent,
        DialogAmendSubscriptionUnits,
        DialogAddonSubscriptionUnits,
        DialogBillPaymentComponent,
    ],
    providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }],
    bootstrap: [AppComponent],
})
export class AppModule {}
