import { Injectable } from '@angular/core';
import { Customer } from '../classes/customer';
import { Transaction } from '../classes/transaction';
import { TransactionLineItem } from '../classes/transaction-line-item';

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    currentCart: Transaction;

    constructor() { }

    getIsLogin(): boolean {
        if (sessionStorage.isLogin == 'true') {
            return true;
        } else {
            return false;
        }
    }

    setIsLogin(isLogin: boolean): void {
        sessionStorage.isLogin = isLogin;
    }

    getCurrentCustomer(): Customer {
        return JSON.parse(sessionStorage.currentCustomer);
    }

    setCurrentCustomer(currentCustomer: Customer): void {
        sessionStorage.currentCustomer = JSON.stringify(currentCustomer);
        this.currentCart = this.getCart();
        this.currentCart.customer = currentCustomer;
        this.setCart(this.currentCart);
    }

    getUsername(): string {
        return sessionStorage.username;
    }

    setUsername(username: string): void {
        sessionStorage.username = username;
    }

    getPassword(): string {
        return sessionStorage.password;
    }

    setPassword(password: string): void {
        sessionStorage.password = password;
    }

    getClearedCart(): Transaction {
        return JSON.parse(sessionStorage.clearedCart);
    }

    setClearedCart(clearedCart: Transaction): void {
        sessionStorage.clearedCart = JSON.stringify(clearedCart);
    }

    getDeletedLineItem(): TransactionLineItem {
        return JSON.parse(sessionStorage.deletedLineItem);
    }

    setDeletedLineItem(deletedLineItem: TransactionLineItem): void {
        sessionStorage.deletedLineItem = JSON.stringify(deletedLineItem);
    }

    getDeletedLineItemIndex(): number {
        return sessionStorage.deletedLineItemIndex;
    }

    setDeletedLineItemIndex(deletedLineItemIndex: number): void {
        sessionStorage.deletedLineItemIndex = deletedLineItemIndex;
    }

    getCart(): Transaction {
        return JSON.parse(sessionStorage.currentCart);
    }

    setCart(currentCart: Transaction): void {
        sessionStorage.currentCart = JSON.stringify(currentCart);
    }

    addToCart(newLineItem: TransactionLineItem): void {
        this.currentCart = this.getCart();
        this.currentCart.transactionLineItems.push(newLineItem);
        this.setCart(this.currentCart);
    }

    undoAddToCart(): void {
        this.currentCart = this.getCart();
        this.currentCart.transactionLineItems.splice(
            this.currentCart.transactionLineItems.length - 1,
            1
        );
        this.setCart(this.currentCart);
    }

    updateLineItemQuantity(lineItemIndex: number, newQuantity: number): void {
        this.currentCart = this.getCart();
        this.currentCart.transactionLineItems[
            lineItemIndex
        ].quantity = newQuantity;

        //newly add
        this.currentCart.transactionLineItems[
            lineItemIndex
        ].subtotal = this.currentCart.transactionLineItems[
            lineItemIndex
        ].quantity * this.currentCart.transactionLineItems[
            lineItemIndex].price;

        this.setCart(this.currentCart);
    }

    removeFromCart(lineItemIndex: number): void {
        this.currentCart = this.getCart();
        this.setDeletedLineItemIndex(lineItemIndex);
        this.setDeletedLineItem(
            this.currentCart.transactionLineItems[lineItemIndex]
        );
        this.currentCart.transactionLineItems.splice(lineItemIndex, 1);
        this.setCart(this.currentCart);
    }

    undoDeleteFromCart(): void {
        this.currentCart = this.getCart();
        this.currentCart.transactionLineItems.splice(
            this.getDeletedLineItemIndex(),
            0,
            this.getDeletedLineItem()
        );
        this.setCart(this.currentCart);
    }

    clearCart(): void {
        this.setClearedCart(this.getCart());
        let newTransaction: Transaction = {
            transactionId: undefined,
            totalPrice: undefined,
            voidRefund: false,
            transactionDateTime: undefined,
            transactionStatusEnum: undefined,
            payment: undefined,
            customer: undefined,
            discountCode: undefined,
            transactionLineItems: [],
        };
        this.setCart(newTransaction);
    }

    undoClearCart(): void {
        this.setCart(this.getClearedCart());
    }
}
