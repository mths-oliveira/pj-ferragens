import { createGoogleSheetsClient } from "../config/google-sheets";
import { serializeProduct } from "./serialize-product";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID || "";
const ALL_RECORDS_EXCEPT_THE_HEADER = "Produtos-2.0!A2:G";

export async function fetchProducts(): Promise<ProductResponse[]> {
  const client = createGoogleSheetsClient(SPREADSHEET_ID);
  try {
    const records = await client.getRecordsByRange(
      ALL_RECORDS_EXCEPT_THE_HEADER
    );
    const products = records.map(serializeProduct);
    return products;
  } catch (error) {
    console.error("erro ao buscar os produtos no google sheets");
    return [];
  }
}
