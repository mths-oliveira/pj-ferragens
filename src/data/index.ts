import { groupProductsByCategory } from "@/lib/utils/group-products-by-category";
import { mapProductsToSectionsByCategory } from "@/lib/utils/map-products-to-sections-by-category";
import { mapSectionsToPages } from "@/lib/utils/map-sections-to-pages";
import { fetchProducts } from "@/lib/utils/fetch-products";
import { getPageNavigationData } from "@/lib/utils/get-page-navigation-data";

interface Data {
  products: Product[];
  pageDataList: PageData[];
  pageNavigationDataList: PageNavigationData[];
}

let data: Data;
export async function getData(): Promise<Data> {
  if (!data) {
    await updateData();
  }
  async function updateData() {
    data = await fetchData();
    // atualização de cache a cada 24 horas
    const oneDay = 1000 * 60 * 60 * 24;
    setTimeout(async () => {
      await updateData();
    }, oneDay);
  }
  return data;
}

export async function fetchData(): Promise<Data> {
  const products = await fetchProducts();
  const productsByCategory = groupProductsByCategory(products);
  const sectionsByCategory =
    mapProductsToSectionsByCategory(productsByCategory);
  const pageDataList = mapSectionsToPages(sectionsByCategory);
  const pageNavigationDataList = getPageNavigationData(pageDataList);
  return {
    products,
    pageDataList,
    pageNavigationDataList,
  };
}
