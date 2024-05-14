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