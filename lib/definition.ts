import { Status } from "@prisma/client";

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
  id: string;
  name: string;
  price: number;
  description: string;
  type: string;
  image: string;
};
export type Order ={
  id:string
  userId:string
  products:Item[]
  total_price:number
  status:Status
  date:Date
}
export type OrderState={
  status:"success" |"error",
  message:string

}
export type ChangePasswordState=OrderState &{
  errors?:{
    currentPassword?:string[]
    newPassword?:string[]
    confirmPassword?:string[]
  }
}
export type updateProfileState=OrderState &{
  errors?:{
    email?:string[]
    fullName?:string[]
  }
}
export type LoginError={
  message:string
}
export type Item = {
  id: string;
  price: number;
  quantity: number;
  name: string;
  size:Size
};
export type Cart={
  itemsList:Array<Item>
}


export type Size="XS"|"S"|"M"|"L"|"XL";

