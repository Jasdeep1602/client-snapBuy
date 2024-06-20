export interface ImageProps {
  public_id: string;
  url: string;
}

export interface InitialProductDetailsProps {
  product_id: string;
  title: string;
  price: string;
  description: string;
  images: ImageProps | null;
  gradientFrom: string;
  gradientTo: string;
  shadowColor: string;
  rating: string;
}
