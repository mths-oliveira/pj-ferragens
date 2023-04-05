import { Float } from "../../utils/float"
import { Product } from "../entities/product"
import { createGoogleClient } from "../../config/create-google-client"
import { removeAccent } from "../../utils/remove-accent"

export class ProductsRepository {
  private static _products: Product[]
  async findAll() {
    if (!ProductsRepository._products) {
      ProductsRepository._products = await this._findAll()
    }
    return ProductsRepository._products
  }
  private async _findAll() {
    const client = await createGoogleClient("Produtos")
    const [_, ...tableRows] = await client.find()
    const products: Product[] = []
    const lastIndex = tableRows[0].length - 1
    for (const row of tableRows) {
      const isDisabled = row[lastIndex] === "FALSE"
      if (isDisabled) continue
      const [ref, name, description, image, price, rate, category] = row
      const priceWithRate = Float(price) + (Float(price) / 100) * Float(rate)

      const product = new Product(
        ref,
        name,
        description,
        image,
        category,
        priceWithRate
      )
      products.push(product)
    }
    return products
  }
  async getProductsByCategory(category: string) {
    const products = await this.findAll()
    return products.filter((product) => {
      const productCategory = removeAccent(product.category)
        .replace(/\W/g, "_")
        .toLocaleLowerCase()
      return productCategory === category
    })
  }
}
