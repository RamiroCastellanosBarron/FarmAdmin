export class Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;

  userId: number;
  user: User;

}

interface User {
  id: number;
  userName: string;
  fistName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  addressId: number;
  address: Address;
}

interface Address {
  id: number;
  street: string;
  number: string;
  zipCode: number;
  city: string;
  country: string;
}
