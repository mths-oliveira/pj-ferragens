import { Float } from "../../utils/float"
import { Product } from "../entities/product"
import { createGoogleClient } from "../../config/create-google-client"

export class ProductsRepository {
  private static _products: Product[]
  private static _productsOrganizedByCategory: any
  private static _categoryDictionary = {
    "Fechaduras e acessórios": "fechaduras_e_acessorios",
    "Ferragens em geral": "ferragens_em_geral",
    "Ferragens para janelas": "ferragens_para_janelas",
    "Ferragens para portas": "ferragens_para_portas",
    "Peças para móveis": "pecas_para_moveis",
    "Utilidades domésticas": "utilidades_domesticas",
  }

  async findAll() {
    if (!ProductsRepository._products) {
      ProductsRepository._products = await this._findAll()
    }
    return ProductsRepository._products
  }

  private async _findAll() {
    const client = await createGoogleClient("Produtos")
    const [_, ...tableRows] = await client.find()
    const products = tableRows.map(
      ([ref, name, description, image, price, rate, disabled]) => {
        const priceWithRate = Float(price) + (Float(price) / 100) * Float(rate)
        const isDisabled = Boolean(disabled)
        const product = new Product(
          ref,
          name,
          description,
          image,
          priceWithRate,
          isDisabled
        )
        return product
      }
    )
    return products.filter((product) => !product.isDisabled)
  }

  async getProductsByCategory(category: string) {
    if (!ProductsRepository._productsOrganizedByCategory) {
      const products = await this.findAll()
      ProductsRepository._productsOrganizedByCategory =
        await this._organizeProductsIntoCategories(products)
    }
    const products: Product[] =
      ProductsRepository._productsOrganizedByCategory[category]
    return products
  }

  private async _organizeProductsIntoCategories(products: Product[]) {
    const client = await createGoogleClient("Páginas")
    const tableColumns = await client.find("COLUMNS")
    const data: any = {}
    for (let [columnName, ...productRefs] of tableColumns) {
      const category = ProductsRepository._categoryDictionary[columnName]
      data[category] = products.filter((product) => {
        return productRefs.includes(product.ref)
      })
    }
    return data
  }
}
