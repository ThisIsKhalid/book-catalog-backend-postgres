export type IBookFilterRequest = {
    searchTerm? : string;
    title?: string;
    author?: string;
    genre?:string;
    category?:string;
    minPrice?:number;
    maxPrice?: number
}