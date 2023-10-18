export type foodType = {
    id: number;
    name: string;
    description: string;
    price: number;
    is_available: boolean;
    discount: number;
    image: string;
    seller_id:number;
    count : number;
}

export type resturantType = {
    id: number;
    name: string;
    opens_at : any;
    closes_at : any;
    address : string;
    image: string;
    slug:string
}