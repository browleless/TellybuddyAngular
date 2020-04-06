import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from 'src/app/service/session.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    constructor(
        private router: Router,
        public sessionService: SessionService
    ) {}

    ngOnInit() {}

    customerLogout(): void {
        this.sessionService.setIsLogin(false);
        this.sessionService.setCurrentCustomer(null);

        this.router.navigate(['/index']);
    }
}
