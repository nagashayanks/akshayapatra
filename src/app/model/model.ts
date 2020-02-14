
export interface CurrentUser {
    userId: number;
}

export interface SchemaSummary {
    schemeName: string;
    description: string;
    amount: number;
    taxBenefitPercentage: number;
    taxBenefitDescription: string;
}
export interface Cause {
    schemeId: number;
    schemeName: string;
    description: string;
    amount: number;
    taxBenefitAmount: number;
    taxBenefitDescription: string;
    imageUrl: string;

 }
export interface Donationdata {

    name: string;
    panNumber: string;
    mobile: number;
    email: string;
    paymentMode: string;
    date: string;
    schemeName: string;
    description: string;
    amount: number;
    taxBenefitAmount: number;
    taxBenefitDescription: number;
 }
