export interface IOrder {
  status: number;
  message: string;
  user_msg: string;
}

export interface IOrderItem {
  id: number;
  cost: number;
  created: string;
}

export interface IOrderList {
  status: number;
  data: IOrderItem[];
  message: string;
  user_msg: string;
}

export interface IOrderDetails {
  status: number;
  data: IOrderDetailsData;
}

export interface IOrderDetailsData {
  id: number;
  cost: number;
  created: string;
  order_details: IOrderProductItem[];
}

export interface IOrderProductItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  total: number;
  prod_name: string;
  prod_cat_name: string;
  prod_image: string;
}

export interface IInitialState {
  orderData: IOrder | null;
  orderList: IOrderList | null;
  orderDetails: IOrderDetails | null;
  isLoading: boolean;
  isError: boolean;
}

export interface IPlaceOrderParams {
  access_token: string | undefined;
  address: string;
}

export interface IGetOrderListParams {
  access_token: string | undefined;
}

export interface IGetOrderDetailsParams {
  access_token: string | undefined;
  order_id: number;
}
