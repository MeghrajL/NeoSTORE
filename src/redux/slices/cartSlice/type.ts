interface Product {
  id: number;
  name: string;
  cost: number;
  product_category: string;
  product_images: string;
  sub_total: number;
}

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product: Product;
}

interface ICart {
  status: number;
  data: CartItem[] | null;
  count: number;
  total: number;
}

export interface IInitialState {
  cart: ICart | null;
  status: number | null;
  data: boolean;
  total_carts: number;
  message: string;
  user_msg: string;
  isLoading: boolean;
  isCartUpdating: boolean;
  isCartItemDeleting: boolean;
  isError: boolean;
}

export interface IAddToCartParams {
  access_token: string | undefined;
  product_id: number;
  quantity: number;
}

export interface IGetCartListParams {
  access_token: string | undefined;
}

export interface IDeleteCartParams {
  access_token: string | undefined;
  product_id: number;
}
