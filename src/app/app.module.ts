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

//for expansion panel
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DialogForgotPasswordComponent } from './components/dialog-forgot-password/dialog-forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PlansComponent } from './components/plans/plans.component';
import { ViewFamilyGroupDetailsComponent } from './components/familyGroup/view-family-group-details/view-family-group-details.component';
import { ViewMembersComponent } from './components/familyGroup/view-members/view-members.component';
import { ViewSettingsComponent } from './components/familyGroup/view-settings/view-settings.component';
import { CreateNewFamilyGroupComponent } from './components/familyGroup/create-new-family-group/create-new-family-group.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { CartComponent } from './components/cart/cart.component';
import { DialogConfigureNewPlanComponent } from './components/dialog-configure-new-plan/dialog-configure-new-plan.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AccountComponent } from './components/account/account.component';
import { ViewTransactionComponent } from './components/transaction-view/transaction-view.component';
import { QuizAttemptComponent } from './components/quiz-attempt/quiz-attempt.component';

import { NumberDirective } from './directive/number.directive';
import { MemberDetailsComponent } from './components/familyGroup/member-details/member-details.component';
import { DialogAddNewFamilyMemberComponent } from './components/dialog-add-new-family-member/dialog-add-new-family-member.component';
import { ProductsComponent } from './components/products/products.component';
import { LuxuryproductsComponent } from './components/luxuryproducts/luxuryproducts.component';
import { EarnAdditionalUnitsComponent } from './components/earn-additional-units/earn-additional-units.component';
import { DialogAllocateAdditionalUnitsComponent } from './components/dialog-allocate-additional-units/dialog-allocate-additional-units.component';
import { DialogRecommendPlansComponent } from './components/dialog-recommend-plans/dialog-recommend-plans.component';
import { DialogAmendSubscriptionUnits } from './components/dialog-amend-subscription-units/dialog-amend-subscription-units.component';
import { DialogAddonSubscriptionUnits } from './components/dialog-addon-subscription-units/dialog-addon-subscription-units.component';

import { BillsComponent } from './components/bills/bills.component';
import { DialogBillPaymentComponent } from './components/dialog-bill-payment/dialog-bill-payment.component';
import { BundlePlansComponent } from './components/bundle-plans/bundle-plans.component';
import { DialogConfigureContractPlanComponent } from './components/dialog-configure-contract-plan/dialog-configure-contract-plan.component';

import { DialogDonateUnitsComponent } from './components/familyGroup/dialog-donate-units/dialog-donate-units.component';
import { DialogReceiveUnitsComponent } from './components/familyGroup/dialog-receive-units/dialog-receive-units.component';
@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        NavbarComponent,
        LoginComponent,
        DialogForgotPasswordComponent,
        ResetPasswordComponent,
        PlansComponent,
        ViewFamilyGroupDetailsComponent,
        ViewMembersComponent,
        ViewSettingsComponent,
        CreateNewFamilyGroupComponent,
        SubscriptionsComponent,
        CartComponent,
        DialogConfigureNewPlanComponent,
        CheckoutComponent,
        NumberDirective,
        MemberDetailsComponent,
        DialogAddNewFamilyMemberComponent,
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
        BundlePlansComponent,
        DialogConfigureContractPlanComponent,
        DialogDonateUnitsComponent,
        DialogReceiveUnitsComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
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
        BrowserAnimationsModule,
        A11yModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        DragDropModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        PortalModule,
        ScrollingModule,
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
        DialogAddNewFamilyMemberComponent,
        DialogAllocateAdditionalUnitsComponent,
        DialogRecommendPlansComponent,
        DialogAmendSubscriptionUnits,
        DialogAddonSubscriptionUnits,
        DialogBillPaymentComponent,
        DialogConfigureContractPlanComponent,
        DialogDonateUnitsComponent,
        DialogReceiveUnitsComponent,
    ],
    providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }],
    bootstrap: [AppComponent],
})
export class AppModule {}
