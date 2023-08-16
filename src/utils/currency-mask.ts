export function currencyMask(value: number) {
  if (Number.isNaN(Number(value))) return
  const formatedValue = value
    .toFixed(2)
    .replace(".", ",")
    .replace(/(\d+)(\d{3})/, "$1.$2")
  return `R$ ${formatedValue}`
}
