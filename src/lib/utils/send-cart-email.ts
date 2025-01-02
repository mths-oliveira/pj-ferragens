export function sendCartEmail(body: any) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
  return fetch(`${API_URL}/send-cart-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
