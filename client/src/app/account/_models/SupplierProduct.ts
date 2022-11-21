export class SupplierProduct {
  id: number;

  idProduct: number;
  product: Product;

  idSupplier: number;
  supplier: Supplier;

  quantity: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface Supplier {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
}
