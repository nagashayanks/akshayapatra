
export interface CurrentUser {
    userId: number;
    userName: string;
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
