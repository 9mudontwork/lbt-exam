export function resolveUrl(baseUrl: string, path: string) {
  const urlSlash = path.endsWith('/') ? baseUrl.replace(/\/$/, '') : baseUrl
  const pathSlash = path.startsWith('/') ? path : `/${path}`

  return `${urlSlash}${pathSlash}`
}
