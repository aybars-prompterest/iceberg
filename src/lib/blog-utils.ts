export function parseTags(tags: string): string[] {
  try {
    return JSON.parse(tags)
  } catch {
    return ['Technology']
  }
}

export function formatPostDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function isValidHttpUrl(url: string): boolean {
  return url.startsWith('https://') || url.startsWith('http://')
}
