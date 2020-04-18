import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Product } from 'src/app/classes/product';
import { ProductService } from 'src/app/service/product.service';
import { TransactionLineItem } from 'src/app/classes/transaction-line-item';
import { SessionService } from 'src/app/service/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  loaded: boolean = false;
  isMobile: boolean = false;
  isTablet: boolean = false;
  isLaptop: boolean = false;
  selectedProduct: Product;


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
    this.productService.retrieveAllNormalProducts().subscribe(
      (response) => {
        this.products = response.products;
        this.products.sort((a, b) => a.price - b.price);
        this.loaded = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addProductToCart(index: number): void {

     this.selectedProduct = this.products[index];

    let newLineItem: TransactionLineItem = {
      product: {
        productId: this.selectedProduct.productId,
        skuCode: this.selectedProduct.skuCode,
        name: this.selectedProduct.name,
        description: this.selectedProduct.description,
        price: this.selectedProduct.price,
        quantityOnHand: this.selectedProduct.quantityOnHand,
        reorderQuantity: this.selectedProduct.reorderQuantity,
        productImagePath: this.selectedProduct.productImagePath,
        tags: this.selectedProduct.tags,
        category: this.selectedProduct.category,
        dealStartTime: this.selectedProduct.dealStartTime,
        dealEndTime: this.selectedProduct.dealEndTime,
        discountPrice: this.selectedProduct.discountPrice,
      },
      transactionLineItemId: undefined,
      price: this.selectedProduct.price,
      quantity: 1,
      subtotal: this.selectedProduct.price,
      transaction: undefined,
      subscription: undefined,
      productItem: undefined,
    };

    this.sessionService.addToCart(newLineItem);

    const snackBarRef = this.snackBar.open(
      'Successfully added Product: "' +
      this.selectedProduct.name +
      '" to the cart! Quantity of product can be adjusted in the cart!',
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
