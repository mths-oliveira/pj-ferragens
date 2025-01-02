import { createSections } from "./create-sections";

export function mapProductsToSectionsByCategory(
  productsByCategory: ProductsByCategory
) {
  const productSectionsByCategory: ProductSectionsByCategory = {};
  for (const [categoryName, products] of Object.entries(productsByCategory)) {
    const productsByName = groupProductsByName(products);
    const sections = createSections(productsByName);
    productSectionsByCategory[categoryName] = sections;
  }
  return productSectionsByCategory;
}

function groupProductsByName(products: Product[]) {
  const productsByName: ProductsByName = {};
  for (const product of products) {
    const names = product.name.split(" ");
    const firstName = names[0];

    if (!productsByName[firstName]) {
      productsByName[firstName] = [];
    }
    productsByName[firstName].push(product);
  }
  return productsByName;
}
