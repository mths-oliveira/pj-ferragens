export function createProduct(
  ref: string,
  name: string,
  description: string,
  image: string,
  price: number
) {
  return {
    ref,
    name,
    description,
    image,
    price,
  }
}

export interface Product {
  ref: string
  name: string
  description: string
  image: string
  price: number
}
