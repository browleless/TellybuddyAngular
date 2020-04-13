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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DialogForgotPasswordComponent } from './components/dialog-forgot-password/dialog-forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PlansComponent } from './components/plans/plans.component';
import { CartComponent } from './components/cart/cart.component';
import { DialogConfigureNewPlanComponent } from './components/dialog-configure-new-plan/dialog-configure-new-plan.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NumberDirective } from './directive/number.directive';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        NavbarComponent,
        LoginComponent,
        DialogForgotPasswordComponent,
        ResetPasswordComponent,
        PlansComponent,
        CartComponent,
        DialogConfigureNewPlanComponent,
        CheckoutComponent,
        NumberDirective,
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
    ],
    entryComponents: [
        DialogForgotPasswordComponent,
        DialogConfigureNewPlanComponent,
    ],
    providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }],
    bootstrap: [AppComponent],
})
export class AppModule {}
