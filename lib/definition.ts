export type State = {
  errors?: {
    product?: string[];
    price?: string[];
    type?: string[];
    description: string[];
    image?: string[];
  };
  message?: string | null;
};
export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  type: string;
  image: string;
};
export type Order ={
  id:string
  user_id:string
  products:[]
  total_price:number
  status:boolean
  date:Date
}
export type OrderState={
  status:string,
  message:string

}
export type LoginError={
  message:string
}
export type Size="XS"|"S"|"M"|"L"|"XL";
export type Item = {
  id: number;
  price: number;
  quantity: number;
  name: string;
  size:Size
};