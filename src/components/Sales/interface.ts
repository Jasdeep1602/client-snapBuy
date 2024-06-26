export interface Items {
  id: string;
  titleinner: string;
  text: string;
  rating: string;
  btn: string;
  img: string;
  price: string;
  gradientFrom: string;
  gradientTo: string;
  shadowColor: string;
  ifExists?: boolean; // Optional prop
}

export interface PopularSales {
  title: string;
  items?: Items[];
}

export interface PopularSalesProps {
  popularSales: PopularSales;
  ifExists?: boolean; // Optional prop
}
