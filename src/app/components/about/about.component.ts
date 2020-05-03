import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
    isMobile: boolean = false;
    isTablet: boolean = false;
    isLaptop: boolean = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private breakpointObserver: BreakpointObserver
    ) {
        this.breakpointObserver
            .observe([
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge,
            ])
            .subscribe((result) => {
                if (result.breakpoints[Breakpoints.XSmall]) {
                    this.isMobile = true;
                    this.isTablet = false;
                    this.isLaptop = false;
                }
                if (result.breakpoints[Breakpoints.Small]) {
                    this.isTablet = true;
                    this.isMobile = false;
                    this.isLaptop = false;
                }
                if (
                    result.breakpoints[Breakpoints.Medium] ||
                    result.breakpoints[Breakpoints.Large]
                ) {
                    this.isLaptop = true;
                    this.isMobile = false;
                    this.isTablet = false;
                }
                if (result.breakpoints[Breakpoints.XLarge]) {
                    this.isMobile = false;
                    this.isTablet = false;
                    this.isLaptop = false;
                }
            });
    }

    ngOnInit() {}
}
