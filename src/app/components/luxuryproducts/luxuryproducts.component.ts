import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Product } from 'src/app/classes/product';
import { LuxuryProduct } from 'src/app/classes/luxury-product';
import { ProductItem } from 'src/app/classes/product-item';
import { ProductService } from 'src/app/service/product.service';
import { TransactionLineItem } from 'src/app/classes/transaction-line-item';
import { SessionService } from 'src/app/service/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatDialog } from '@angular/material/dialog';
import { DialogRecommendPlansComponent } from '../dialog-recommend-plans/dialog-recommend-plans.component';

@Component({
    selector: 'app-luxuryproducts',
    templateUrl: './luxuryproducts.component.html',
    // template: ` <app-child [lineItem]="lineItem"></app-child> `,
    styleUrls: ['./luxuryproducts.component.css'],
})
export class LuxuryproductsComponent implements OnInit {
    luxuryProducts: Product[];
    productImages: any[] = [];
    loaded: boolean = false;
    isMobile: boolean = false;
    isTablet: boolean = false;
    isLaptop: boolean = false;
    selectedLuxury: Product;
    lineItem: TransactionLineItem;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private breakpointObserver: BreakpointObserver,
        private snackBar: MatSnackBar,
        public sessionService: SessionService,
        public dialog: MatDialog
    ) {
        breakpointObserver
            .observe(['(max-width: 599px)'])
            .subscribe((result) => {
                this.isMobile = result.matches;
            });
        breakpointObserver
            .observe(['(max-width: 1279px)'])
            .subscribe((result) => {
                this.isTablet = result.matches;
                this.isMobile = false;
            });
        breakpointObserver
            .observe(['(max-width: 1919px)'])
            .subscribe((result) => {
                this.isLaptop = result.matches;
                this.isMobile = false;
                this.isTablet = false;
            });
    }

    ngOnInit() {
        this.productService.retrieveAllLuxuryProducts().subscribe(
            (response) => {
                this.luxuryProducts = response.products;
                this.luxuryProducts.sort((a, b) => a.price - b.price);
                for (var i = 0; i < this.luxuryProducts.length; i++) {
                    this.productService
                        .retrieveProductImage(this.luxuryProducts[i].productId)
                        .subscribe(
                            (data) => {
                                this.createImageFromBlob(data, i);
                            },
                            (error) => {
                                console.log(error);
                            }
                        );
                }
                
            },
            (error) => {
                console.log(error);
            }
        );
        setTimeout(() => {
            this.loaded = true;
        }, 1000);
    }
    createImageFromBlob(image: Blob, i: number) {
        let reader = new FileReader();
        reader.addEventListener(
            'load',
            () => {
                this.productImages.push(reader.result);
            },
            false
        );

        if (image) {
            reader.readAsDataURL(image);
        }
    }
    addLuxuryProductToCart(index: number): void {
        this.selectedLuxury = this.luxuryProducts[index];

        //type cast
        let selectedLuxuryProd: LuxuryProduct;
        selectedLuxuryProd = this.selectedLuxury as LuxuryProduct;
        // if (this.selectedLuxury instanceof LuxuryProduct) {
        //   selectedLuxuryProd = this.selectedLuxury as LuxuryProduct;
        // }

        let newLineItem: TransactionLineItem = {
            product: undefined,
            transactionLineItemId: undefined,
            price: this.selectedLuxury.price,
            quantity: 1,
            subtotal: this.selectedLuxury.price,
            transaction: undefined,
            subscription: undefined,
            productItem: {
                productItemId: undefined,
                serialNumber: undefined,
                price: selectedLuxuryProd.price,
                luxuryProduct: {
                    serialNumber: selectedLuxuryProd.serialNumber,
                    productItems: undefined,
                    productId: this.selectedLuxury.productId,
                    skuCode: this.selectedLuxury.skuCode,
                    name: this.selectedLuxury.name,
                    description: this.selectedLuxury.description,
                    price: this.selectedLuxury.price,
                    quantityOnHand: this.selectedLuxury.quantityOnHand,
                    reorderQuantity: this.selectedLuxury.reorderQuantity,
                    productImagePath: this.selectedLuxury.productImagePath,
                    tags: this.selectedLuxury.tags,
                    category: this.selectedLuxury.category,
                    dealStartTime: this.selectedLuxury.dealStartTime,
                    dealEndTime: this.selectedLuxury.dealEndTime,
                    discountPrice: this.selectedLuxury.discountPrice,
                },
            },
        };

        this.lineItem = newLineItem;

        this.dialog.open(DialogRecommendPlansComponent, {
            data: {
                lineItem: newLineItem,
            },
            height: '220px',
            width: '460px',
        });
    }
}
