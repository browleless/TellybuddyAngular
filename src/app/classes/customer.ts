import { CustomerStatusEnum } from '../enum/customer-status-enum';
import { Subscription } from './subscription';
import { QuizAttempt } from './quiz-attempt';
import { Transaction } from './transaction';
import { Announcement } from './announcement';
import { FamilyGroup } from './family-group';
import { Bill } from './bill';

export class Customer {
    customerId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    joinDate: Date;
    age: number;
    address: string;
    newAddress: string;
    postalCode: string;
    newPostalCode: string;
    nric: string;
    newNric: string;
    nricImagePath: string;
    newNricImagePath: string;
    profilePhoto: string;
    email: string;
    loyaltyPoints: number;
    customerStatusEnum: CustomerStatusEnum;
    counter: number;
    creditCardNumber: string;
    cvv: string;
    creditCardExpiryDate: Date;
    isApproved: boolean;
    bills: Bill[];
    subscriptions: Subscription[];
    quizAttempts: QuizAttempt[];
    transactions: Transaction[];
    announcements: Announcement[];
    familyGroup: FamilyGroup;
    ownerOfFamilyGroup: boolean;
    consecutiveMonths: number;
    constructor(
        customerId?: number,
        username?: string,
        password?: string,
        firstName?: string,
        lastName?: string,
        joinDate?: Date,
        age?: number,
        address?: string,
        newAddress?: string,
        postalCode?: string,
        newPostalCode?: string,
        nric?: string,
        newNric?: string,
        nricImagePath?: string,
        newNricImagePath?: string,
        profilePhoto?: string,
        email?: string,
        loyaltyPoints?: number,
        customerStatusEnum?: CustomerStatusEnum,
        counter?: number,
        creditCardNumber?: string,
        cvv?: string,
        creditCardExpiryDate?: Date,
        isApproved?: boolean,
        bills?: Bill[],
        subscriptions?: Subscription[],
        quizAttempts?: QuizAttempt[],
        transactions?: Transaction[],
        announcements?: Announcement[],
        familyGroup?: FamilyGroup,
        ownerOfFamilyGroup?: boolean,
        consecutiveMonths?: number
    ) {
        this.loyaltyPoints = loyaltyPoints;
        this.customerStatusEnum = customerStatusEnum;
        this.counter = counter;
        this.creditCardExpiryDate = creditCardExpiryDate;
        this.creditCardNumber = creditCardNumber;
        this.cvv = cvv;
        this.isApproved = isApproved;
        this.bills = bills;
        this.subscriptions = subscriptions;
        this.quizAttempts = quizAttempts;
        this.transactions = transactions;
        this.announcements = announcements;
        this.familyGroup = familyGroup;
        this.password = password;
        this.address = address;
        this.postalCode = postalCode;
        this.nric = nric;
        this.nricImagePath = nricImagePath;
        this.customerId = customerId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.newAddress = newAddress;
        this.newPostalCode = newPostalCode;
        this.email = email;
        this.newNric = newNric;
        this.newNricImagePath = newNricImagePath;
        this.customerStatusEnum = customerStatusEnum;
        this.joinDate = joinDate;
        this.profilePhoto = profilePhoto;
        this.ownerOfFamilyGroup = ownerOfFamilyGroup;
        this.consecutiveMonths = consecutiveMonths;
    }
}
