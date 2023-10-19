import { createGoogleClient } from "../../config/create-google-client"
import { removeAccent } from "../../utils/remove-accent"
import { createProduct } from "../entities/product"
import productImages from "../../../productImages.json"
export class ProductRepository {
  async find(category?: string) {
    const productClient = await createGoogleClient("Produtos")
    const [_, ...tableRows] = await productClient.findAll()
    const products = []
    for (const tableRow of tableRows) {
      const [
        ref,
        name,
        description,
        _,
        price,
        rate,
        productCategory,
        isAvailable,
      ] = tableRow
      if (isAvailable === "FALSE") continue
      if (category) {
        const query = removeAccent(productCategory)
          .replace(/\s/g, "_")
          .toLowerCase()
        if (category !== query) continue
      }
      const priceWithRate = Float(price) + (Float(price) / 100) * Float(rate)
      const src = productImages[ref]

      const product = createProduct(ref, name, description, src, priceWithRate)
      products.push(product)
    }
    return products
  }
}

function Float(algorithms: string) {
  return Number(algorithms.replace(/[^0-9,]/g, "").replace(",", "."))
}
