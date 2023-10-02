export interface IProduct {
  id: number;
  product_category_id: number;
  name: string;
  producer: string;
  description: string;
  cost: number;
  rating: number;
  view_count: number;
  created: string;
  modified: string;
  product_images: string;
}

export interface ICategory {
  status: number;
  data: IProduct[] | [];
}

export interface IProductImage {
  id: number;
  product_id: number;
  image: string;
  created: string;
  modified: string;
}

export interface IIndividualProduct {
  id: number;
  product_category_id: number;
  name: string;
  producer: string;
  description: string;
  cost: number;
  rating: number;
  view_count: number;
  created: string;
  modified: string;
  product_images: IProductImage[];
}

export interface IProductData {
  status: number;
  data: IIndividualProduct | null;
}

export interface IGetCategoryListParams {
  product_category_id: number;
  limit?: Number;
  page?: Number;
}

export interface IGetProductParams {
  product_id: number;
}

export interface ISetProductRatingParams {
  product_id: number;
  rating: number;
}

export interface IProductRatingData {
  status: number;
  data: {
    id: number;
    product_category_id: number;
    name: string;
    producer: string;
    description: string;
    cost: number;
    rating: number;
    view_count: number;
    created: string;
    modified: string;
  };
  message: string;
  user_msg: string;
}

export interface IInitialState {
  category: ICategory | null;
  productData: IProductData | null;
  rating: IProductRatingData | null;
  isLoading: boolean;
  isError: boolean;
  isSettingRating: boolean;
}
