export class PharmacyProduct {
  id: number;

  idProduct: number;
  product: Product;

  idPharmacy: number;
  pharmacy: Pharmacy;

  quantity: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface Pharmacy {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
}
