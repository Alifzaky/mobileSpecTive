export interface ExternalLaptop {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string; 
}

export interface LaptopAPIResponse {
  products: ExternalLaptop[];
  total: number;
  skip: number;
  limit: number;
}