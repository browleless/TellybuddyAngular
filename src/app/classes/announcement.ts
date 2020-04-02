import { AnnouncementRecipientEnum } from '../enum/announcement-recipient-enum';
export class Announcement {
    announcementId: number;
    title: string;
    content: string;
    postedDate: Date;
    expiryDate: Date;
    announcementRecipientEnum: AnnouncementRecipientEnum;

    constructor(
        announcementId?: number,
        title?: string,
        content?: string,
        postedDate?: Date,
        expiryDate?: Date,
        announcementRecipientEnum?: AnnouncementRecipientEnum
    ) {
        this.announcementId = announcementId;
        this.title = title;
        this.content = content;
        this.postedDate = postedDate;
        this.expiryDate = expiryDate;
        this.announcementRecipientEnum = announcementRecipientEnum;
    }
}
