export function CPFMask(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d+)/, '$1.$2')
    .replace(/^(\d{3}\.\d{3})(\d+)/, '$1.$2')
    .replace(/^(\d{3}\.\d{3}\.\d{3})(\d+)/, '$1-$2');
}
