export interface Listing {
  _id: string;
  name: string;
  description: string;
  address: string;
  type: "rent" | "sale";
  parking: boolean;
  furnished: boolean;
  offer: boolean;
  bedrooms: number;
  bathrooms: number;
  regularPrice: number;
  discountPrice?: number;
  images: string[];
  createdAt: string;
}
