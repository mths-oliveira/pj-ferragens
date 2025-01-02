import { google } from "googleapis";

const GOOGLE_CREDENTIALS = process.env.GOOGLE_CREDENTIALS || "";
export function getGoogleAuthJWT(scopes: string | string[]) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(
      Buffer.from(GOOGLE_CREDENTIALS, "base64").toString("utf-8")
    ),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  return auth;
}

export function createGoogleSheetsClient(spreadsheetId: string) {
  const auth = getGoogleAuthJWT([
    "https://www.googleapis.com/auth/spreadsheets",
  ]);

  const client = google.sheets({
    version: "v4",
    auth,
  });

  async function getRecordsByRange(range: string): Promise<string[][]> {
    const response = await client.spreadsheets.values.get({
      range,
      spreadsheetId,
    });
    return response.data.values || [];
  }

  return {
    getRecordsByRange,
  };
}
