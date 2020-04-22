import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Product } from 'src/app/classes/product';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { TagService } from 'src/app/service/tag.service';
import { TransactionLineItem } from 'src/app/classes/transaction-line-item';
import { SessionService } from 'src/app/service/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/classes/category';
import { Tag } from 'src/app/classes/tag';

@Component({
    selector: 'app-view-all-products',
    templateUrl: './view-all-products.component.html',
    styleUrls: ['./view-all-products.component.css'],
})
export class ViewAllProductsComponent implements OnInit {
    products: Product[];
    categories: Category[];
    tags: Tag[];
    loaded: boolean = false;
    isMobile: boolean = false;
    isTablet: boolean = false;
    isLaptop: boolean = false;

    // user input
    selectedCategories: Category[];
    selectedTags: Tag[];
    searchInput: string;
    displayedProducts: Product[];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private categoryService: CategoryService,
        private tagService: TagService,
        private breakpointObserver: BreakpointObserver,
        private snackBar: MatSnackBar,
        public sessionService: SessionService
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
                this.displayedProducts = response.products;
                this.products.sort((a, b) => a.price - b.price);
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );

        this.loaded = false;
        this.categoryService.retrieveAllCategories().subscribe(
            (response) => {
                this.categories = response.categories;
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );

        this.loaded = false;
        this.tagService.retrieveAllTags().subscribe(
            (response) => {
                this.tags = response.tags;
                this.loaded = true;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    searchProducts(event: any): void {
        this.searchInput = event.target.value;
        this.productService.searchProductsByName(this.searchInput).subscribe(
            (response) => {
                this.displayedProducts = response.products;
                this.products.sort((a, b) => a.price - b.price);
                this.loaded = true;
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

    filterByTags(): void {}

    filterByCategory(): void {}
}
