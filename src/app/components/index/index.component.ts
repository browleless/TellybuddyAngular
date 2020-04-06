import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from 'src/app/service/session.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
    constructor(
        private router: Router,
        public sessionService: SessionService
    ) {}

    ngOnInit() {}
}
