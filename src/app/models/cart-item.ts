import {Product} from "./product";

export class CartItem {
  code: string;
  // id: number;
  productId: number;
  productName: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;

  // constructor(init?: Partial<CartItem>) {
  //   Object.assign(this, init);
  // }
  constructor( product: Product, qty = 1) {
    this.productId = product.id;
    this.title = product.title;
    this.price = product.price;
    this.quantity = qty;
    this.code = product.code;
  }
  get totalPrice() { return this.price * this.quantity; }
}
