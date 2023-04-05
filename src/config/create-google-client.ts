import { google } from "googleapis"
import credentials from "../../credentials.json"

type MajorDimension = "COLUMNS" | "ROWS"

export interface Client {
  add: (valus: string[]) => Promise<void>
  find: (majorDimension?: MajorDimension) => Promise<string[][]>
}

export async function createGoogleClient(tableName: string): Promise<Client> {
  const spreadsheetId = "1VyColEKAHtZhq6TRevYk1O0rFEaHdwgclnNHYNVBDtY"
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  })
  const client = await auth.getClient()
  const sheets = google.sheets({
    version: "v4",
    auth: client,
  })

  async function add(values: string[]) {
    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: tableName,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [values],
      },
    })
  }

  async function find(majorDimension: MajorDimension = "ROWS") {
    const response = await sheets.spreadsheets.values.get({
      auth,
      range: tableName,
      spreadsheetId,
      majorDimension,
    })
    return response.data.values
  }

  return {
    add,
    find,
  }
}
