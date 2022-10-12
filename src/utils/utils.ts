export const stringCapitalize = (str: string): string => {
  return str.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())
}

export const capitalize = (str: string): string => {
  return str[0].toUpperCase() + str.substring(1)
}

export const centsToReal = (cents: number): string => {
  const real = cents / 100
  return real.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
