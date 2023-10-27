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

export type orderType = {
    id: string|number;
    username: string;
    user_id: string | number;
    sellername: string;
    seller_id: string | number;
    address: string;
    delivery_fee: number;
    total: number;
    subTotal: number;
    item_count: number;
    selected_foods: foodType[];
    ordered_at : any;
    status: string;
    profiles : any;
    is_available : boolean;
    responsed_at : any;
    customer_message : string;
};