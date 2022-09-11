export interface invoice{
    id?: string;
    invoiceDate: Date;
    month: string;
    year: string;
    suscriptionid: string;
    totalvalue: string;
    totaldue: string;
    taxes: string;
    subsidyValue: string;
}

export interface invoicedet{
    id?: string;
    invoiceid: string;
    pricedetid: string;
    description: string;
    quoteid: string;
    measure: string;
    detvalue: string;
}