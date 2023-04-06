import { Observer } from "./observer"
import { Product } from "../backend/entities/product"
import { isEmpty } from "../utils/is-empty"

export class ShoppingCart extends Observer<Product[]> {
  constructor(private _products: Product[] = []) {
    super()
  }

  get products() {
    return this._products
  }

  set products(products: Product[]) {
    if (isEmpty(this._products)) {
      this._products = products
    }
  }

  add(product: Product) {
    const productAlreadyAdded = this._products.find(({ ref }) => {
      return product.ref === ref
    })
    if (productAlreadyAdded) {
      productAlreadyAdded.amount += product.amount
    } else {
      this._products.push(product)
    }
    this._notfyAll(this._products)
  }

  remove(productRef: string) {
    const products: Product[] = []
    for (const product of this._products) {
      if (product.ref !== productRef) {
        products.push(product)
      }
    }
    this._products = products
    this._notfyAll(this._products)
  }

  clear() {
    this._products = []
    this._notfyAll(this._products)
  }

  get subtotal() {
    let subtotal = 0
    for (const product of this._products) {
      subtotal += product.subtotal
    }
    return subtotal
  }
}
