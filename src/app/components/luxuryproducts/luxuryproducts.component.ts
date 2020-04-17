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

import {MatSidenavModule} from '@angular/material/sidenav';


@Component({
  selector: 'app-luxuryproducts',
  templateUrl: './luxuryproducts.component.html',
  styleUrls: ['./luxuryproducts.component.css']
})
export class LuxuryproductsComponent implements OnInit {

  luxuryProducts: Product[];
  loaded: boolean = false;
  isMobile: boolean = false;
  isTablet: boolean = false;
  isLaptop: boolean = false;
  selectedLuxury: Product;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    public sessionService: SessionService) {
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
        this.loaded = true;
      },
      (error) => {
        console.log(error);
      }
    );
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
      }
    };

    this.sessionService.addToCart(newLineItem);

    const snackBarRef = this.snackBar.open(
      'Successfully added Product: "' +
      this.selectedLuxury.name +
      '" to the cart!',
      'Undo',
      {
        duration: 4500,
      }
    );

    snackBarRef.onAction().subscribe(() => {
      this.sessionService.undoAddToCart();
    });

  }


}
