import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { DialogRecommendPlansComponent } from '../dialog-recommend-plans/dialog-recommend-plans.component';

import { Product } from 'src/app/classes/product';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { TagService } from 'src/app/service/tag.service';
import { Transaction } from 'src/app/classes/transaction';
import { TransactionLineItem } from 'src/app/classes/transaction-line-item';
import { SessionService } from 'src/app/service/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/classes/category';
import { Tag } from 'src/app/classes/tag';
import { LuxuryProduct } from 'src/app/classes/luxury-product';

@Component({
    selector: 'app-view-all-products',
    templateUrl: './view-all-products.component.html',
    styleUrls: ['./view-all-products.component.css'],
})
export class ViewAllProductsComponent implements OnInit {
    products: Product[];
    productImages: any[] = [];
    displayProductImages: Map<String,Blob> = new Map();
    luxuryProducts: Product[];
    categories: Category[];
    tags: Tag[];
    loaded: boolean = false;
    isMobile: boolean = false;
    isTablet: boolean = false;
    isLaptop: boolean = false;

    // user input
    selectedTags: number[];
    condition: string = 'AND';
    selectedCategories: number[];
    searchInput: string;
    displayProducts: Product[];
    selectedProduct: Product;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private categoryService: CategoryService,
        private tagService: TagService,
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
        this.loaded = false;
        this.productService.retrieveAllProducts().subscribe(
            (response) => {
                this.products = response.products;
                this.displayProducts = response.products;
                this.products.sort((a, b) => a.price - b.price);
                this.displayProducts.sort((a, b) => a.price - b.price);
                this.generateProductImages();
            },
            (error) => {
                console.log(error);
            }
        );

        this.productService.retrieveAllLuxuryProducts().subscribe(
            (response) => {
                this.luxuryProducts = response.products;
                this.luxuryProducts.sort((a, b) => a.price - b.price);
            },
            (error) => {
                console.log(error);
            }
        );

        this.categoryService.retrieveAllCategories().subscribe(
            (response) => {
                this.categories = response.categories;
            },
            (error) => {
                console.log(error);
            }
        );

        this.tagService.retrieveAllTags().subscribe(
            (response) => {
                this.tags = response.tags;
            },
            (error) => {
                console.log(error);
            }
        );
        setTimeout(() => {
            this.loaded = true;
        }, 1000);

        this.selectedTags = new Array<number>();
        this.selectedCategories = new Array<number>();
    }
    generateProductImages() {
        this.productImages = [];
        for (var i = 0; i < this.products.length; i++) {
            this.productService
                .retrieveProductImage(this.products[i].productId)
                .subscribe(
                    (data) => {
                        let reader = new FileReader();
                        reader.addEventListener(
                            'load',
                            () => {
                                this.productImages.push(reader.result);
                            },
                            false
                        );

                        if (data) {
                            reader.readAsDataURL(data);
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
        // for (var i = 0; i < this.products.length; i++) {
        //     console.log(this.products[i].productId);
        //     this.displayProductImages.set(this.products[i].productId.toString(), this.productImages[i]);
        // }
    }
    searchProducts(event: any): void {
        this.searchInput = event.target.value;
        console.log(this.searchInput);
        this.productService.searchProductsByName(this.searchInput).subscribe(
            (response) => {
                this.displayProducts = response.products;
                this.products.sort((a, b) => a.price - b.price);
                this.loaded = true;
                // this.generateProductImages();
            },
            (error) => {
                console.log(error);
            }
        );
        // this.searchInput = event.target.value;
        // var filteredResult = new Array<Product>();

        // console.log(this.searchInput);

        // for (let p of this.products) {
        //     if (
        //         p.name.startsWith(this.searchInput) ||
        //         p.name === this.searchInput
        //     ) {
        //         filteredResult.push(p);
        //     }
        // }

        // this.displayedProducts = filteredResult;
    }

    selectCategory(index: number): void {
        let categoryId = this.categories[index].categoryId;
        let removed: boolean = false;

        for (var i = 0; i < this.selectedCategories.length; i++) {
            if (this.selectedCategories[i] == categoryId) {
                //remove it from selection
                console.log('removed ' + this.categories[index].name);
                this.selectedCategories.splice(i, 1);
                removed = true;
            }
        }

        if (!removed) {
            //add it into the list of selected category
            this.selectedCategories.push(categoryId);
            console.log('console: added ' + this.categories[index].name);
        }

        //trigger the restful method
        this.filterByCategories();
        // this.generateProductImages();
    }

    filterByCategories(): void {
        if (this.selectedCategories.length == 0) {
            this.productService.retrieveAllProducts().subscribe(
                (response) => {
                    this.products = response.products;
                    this.displayProducts = response.products;
                    this.products.sort((a, b) => a.price - b.price);
                    this.displayProducts.sort((a, b) => a.price - b.price);
                    this.loaded = true;
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            this.productService
                .filterProductsByMultipleCategories(this.selectedCategories)
                .subscribe(
                    (response) => {
                        this.displayProducts = response.products;
                        this.displayProducts.sort((a, b) => a.price - b.price);
                        this.loaded = true;
                        console.log(
                            'num of products: ' + this.displayProducts.length
                        );
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
    }

    selectTag(index: number): void {
        let tagId = this.tags[index].tagId;
        let removed: boolean = false;

        for (var i = 0; i < this.selectedTags.length; i++) {
            if (this.selectedTags[i] == tagId) {
                //remove it from selection
                console.log('removed ' + this.tags[index].name);
                this.selectedTags.splice(i, 1);
                removed = true;
            }
        }

        if (!removed) {
            //add it into the list of selected tags
            this.selectedTags.push(tagId);
            console.log(
                'console: added ' + this.tags[index].name + ' to selected'
            );
        }

        this.filterByTags();
        // this.generateProductImages();
    }

    filterByTags(): void {
        if (this.selectedTags.length == 0) {
            this.productService.retrieveAllProducts().subscribe(
                (response) => {
                    this.products = response.products;
                    this.displayProducts = response.products;
                    this.products.sort((a, b) => a.price - b.price);
                    this.displayProducts.sort((a, b) => a.price - b.price);
                    this.loaded = true;
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            this.productService
                .filterProductsByTags(this.selectedTags, this.condition)
                .subscribe(
                    (response) => {
                        this.displayProducts = response.products;
                        this.displayProducts.sort((a, b) => a.price - b.price);
                        this.loaded = true;
                        console.log(
                            'num of products: ' + this.displayProducts.length
                        );
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
    }

    selectProduct(index: number): void {
        this.selectedProduct = this.displayProducts[index];
        let isLuxury: boolean = false;

        for (let luxury of this.luxuryProducts) {
            if (this.selectedProduct.productId == luxury.productId) {
                isLuxury = true;
                this.addLuxuryProductToCart();
            }
        }

        if (!isLuxury) {
            this.addProductToCart();
        }
    }

    addProductToCart(): void {
        let added: boolean = false;

        //check if normal product is already a lineItem in cart
        let currentTransaction: Transaction = this.sessionService.getCart();
        let currentLineItems: TransactionLineItem[] =
            currentTransaction.transactionLineItems;

        let indexI: number;
        for (let index = 0; index < currentLineItems.length; index++) {
            let li: TransactionLineItem = currentLineItems[index];
            if (
                li.productItem == undefined &&
                li.subscription === undefined &&
                li.product.productId == this.selectedProduct.productId &&
                li.price == this.selectedProduct.price
            ) {
                currentLineItems[index].quantity =
                    currentLineItems[index].quantity + 1;
                currentLineItems[index].subtotal =
                    currentLineItems[index].quantity *
                    currentLineItems[index].price;
                added = true;
                indexI = index;
            }
        }
        currentTransaction.transactionLineItems = currentLineItems;
        this.sessionService.setCart(currentTransaction);

        const snackBarRef = this.snackBar.open(
            'Successfully increased quantity of Product: "' +
                this.selectedProduct.name +
                '" by 1 to the cart! Quantity can be adjusted in the cart!',
            'Undo',
            {
                duration: 4500,
            }
        );

        snackBarRef.onAction().subscribe(() => {
            this.sessionService.updateLineItemQuantity(
                indexI,
                currentLineItems[indexI].quantity - 1
            );
        });

        if (added == false) {
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

    addLuxuryProductToCart(): void {
        //type cast
        let selectedLuxuryProd: LuxuryProduct;
        selectedLuxuryProd = this.selectedProduct as LuxuryProduct;
        // if (this.selectedLuxury instanceof LuxuryProduct) {
        //   selectedLuxuryProd = this.selectedLuxury as LuxuryProduct;
        // }

        let newLineItem: TransactionLineItem = {
            product: undefined,
            transactionLineItemId: undefined,
            price: this.selectedProduct.price,
            quantity: 1,
            subtotal: this.selectedProduct.price,
            transaction: undefined,
            subscription: undefined,
            productItem: {
                productItemId: undefined,
                serialNumber: undefined,
                price: selectedLuxuryProd.price,
                luxuryProduct: {
                    serialNumber: selectedLuxuryProd.serialNumber,
                    productItems: undefined,
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
            },
        };

        this.dialog.open(DialogRecommendPlansComponent, {
            data: {
                lineItem: newLineItem,
            },
            height: '220px',
            width: '460px',
        });
    }
}
