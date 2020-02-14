
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
export interface BookedslotAppointments {

    hospitalName: string;
    date: string;
    slotTime: string;
    patientId: number;
    patientName: string;
    email: string;
    mobile: number;

 }
