export function Float(algorithms: string) {
  return Number(algorithms.replace(/[^0-9,]/g, '').replace(',', '.'));
}
