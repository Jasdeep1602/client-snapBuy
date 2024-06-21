export interface ProductProps {
  shoeproducts: [];
}

export interface CardProps {
  _id: string;
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
