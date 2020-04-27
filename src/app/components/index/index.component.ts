import {
    Component,
    OnInit,
    ElementRef,
    AfterViewInit,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from 'src/app/service/session.service';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { Announcement } from 'src/app/classes/announcement';
import { DiscountCodeService } from 'src/app/service/discount-code.service';
import { DiscountCode } from 'src/app/classes/discount-code';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
    announcements: Announcement[];
    availableDiscountCodes: DiscountCode[];
    isMobile: boolean = false;
    isTablet: boolean = false;
    isLaptop: boolean = false;
    loaded: boolean = false;
    loadedDiscountCodes: boolean = false;

    constructor(
        private router: Router,
        public sessionService: SessionService,
        public announcementService: AnnouncementService,
        private discountCodeService: DiscountCodeService,
        private breakpointObserver: BreakpointObserver,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
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

        this.announcementService
            .retrieveAllAnnouncements()
            .subscribe((response) => {
                this.announcements = response.announcements;
            }),
            (error) => {
                console.log(error);
            };

        this.loadDiscountCodes();
    }

    loadDiscountCodes() {
        this.loadedDiscountCodes = false;
        this.discountCodeService
            .retrieveAllUsableActiveDiscountCodes()
            .subscribe(
                (response) => {
                    this.availableDiscountCodes = response.discountCodes;
                    this.availableDiscountCodes.forEach((discountCode) => {
                        discountCode.expiryDate = new Date(
                            Date.parse(
                                discountCode.expiryDate
                                    .toString()
                                    .substring(0, 19)
                            ) +
                                8 * 60 * 60 * 1000
                        );
                    });
                    this.loaded = true;
                    this.loadedDiscountCodes = true;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    copyToClipboard(text: string) {
        document.addEventListener('copy', (e: ClipboardEvent) => {
            e.clipboardData.setData('text/plain', text);
            e.preventDefault();
            document.removeEventListener('copy', null);
        });
        document.execCommand('copy');

        this.snackBar.open('Copied to clipboard successfully!', 'Close', {
            duration: 4500,
        });
    }
}
