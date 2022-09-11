export interface price {
    id?: string;
    name: string;
    detail: Array<pricedet>;
}

export interface pricedet{
    id?: string;
    name: string;
    value: string;
}