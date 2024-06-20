export interface ProductProps {
  products: [];
}

export interface CardProps {
  product_id: string;
  title: string;
  price: string;
  description: string;
  images: ImageProps;
  gradientFrom: string;
  gradientTo: string;
  shadowColor: string;
  rating: string;
}

export interface ImageProps {
  public_id: string;
  url: string;
}
