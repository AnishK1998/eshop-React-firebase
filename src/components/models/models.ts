export interface productModel{
    name: string;
    imageUrl: string;
    price: string | number;
    category: string;
    brand: string;
    description: string;
    id?: string ;
    productId? : string;
}

export interface propductListProp {
    products: productModel[] | undefined;
  }

export interface searchPropModel{
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>
  }

export interface productItemProp{
    grid: boolean;
    item: productModel;
    products: productModel[] | undefined;
}

export interface paginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  productsPerPage: number
  totalProducts: number
}

export interface initialAddressState{
  name: "";
  line1: "";
  line2: "";
  city: "";
  state: "";
  postal_code: "";
  country: "";
  phone: "";
}

export interface Orders {
  id:              string;
  shippingAddress: ShippingAddress;
  userId:          string;
  orderStatus:     string;
  orderTime:       string;
  userEmail:       string;
  orderItems:      OrderItem[];
  orderAmount:     number;
  createdAt:       number;
  orderDate:       string;
}

export interface OrderItem {
  id:           string;
  name:         string;
  createdAt:    number;
  category:     string;
  brand:        string;
  description:  string;
  imageUrl:     string;
  price:        string;
  cartQuantity: number;
}

export interface ShippingAddress {
  country:     string;
  state:       string;
  phone:       string;
  city:        string;
  line1:       string;
  postal_code: string;
  line2:       string;
  name:        string;
}

export interface Reviews {
  id:         string;
  productId:  string;
  review:     string;
  userName:   string;
  createdAt:  number;
  rate:       number;
  userId:     string;
  reviewDate: string;
}

export interface infoProps {
  title: string;
  count: number;
  icon: any;
}

export interface changeOrderProps{
  orders: Orders | null,
  id: string | undefined;
}
