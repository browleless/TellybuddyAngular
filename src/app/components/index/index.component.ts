import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from 'src/app/service/session.service';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { Announcement } from 'src/app/classes/announcement';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventDirection } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
    constructor(
        private router: Router,
        public sessionService: SessionService,
        public announcementService: AnnouncementService
    ) {}

    @ViewChild("slider", { static: false } ) slider: ElementRef;
    announcements: Announcement[];
    staticAlertClosed = false;
    left: boolean;


    ngOnInit() {
        setTimeout(() => this.staticAlertClosed = true, 20000);
        this.announcementService
            .retrieveAllAnnouncements()
            .subscribe((response) => {
                this.announcements = response.announcements;

            }),
            
            (error) => {
                console.log(error);
            };
    }
    changeSlide(event: NgbSlideEvent){
        if(event.direction == NgbSlideEventDirection.LEFT){
            this.left = null     
            this.left = true;
            console.log('left')
            // @HostBinding 
            // dom.queryselector
            
        } else{
            this.left = null
            this.left = false      
            console.log('right')
        }
    }
}
