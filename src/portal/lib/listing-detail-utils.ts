export function normalizeStringArray(value: any): string[] {
  if (!value) return []
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === 'string'
          ? item
          : item?.name || item?.label || item?.title || ''
      )
      .filter(Boolean)
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

export function normalizeLinkArray(value: any): Array<{ label: string; url: string }> {
  if (!value) return []
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (!item) return null
        if (typeof item === 'string') {
          return {
            label: item.replace(/^https?:\/\//, '').replace(/\/.*$/, ''),
            url: item,
          }
        }

        const url = item.url || item.link || item.website || item.address || ''
        if (!url) return null

        return {
          label:
            item.platform || item.name || item.label || item.title ||
            url.replace(/^https?:\/\//, '').replace(/\/.*$/, ''),
          url,
        }
      })
      .filter((item): item is { label: string; url: string } => Boolean(item && item.url))
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((url) => ({
        label: url.replace(/^https?:\/\//, '').replace(/\/.*$/, ''),
        url,
      }))
  }
  return []
}

export function getListingMapSrc(listing: any): string {
  if (typeof listing?.google_maps_link === 'string' && listing.google_maps_link.includes('output=embed')) {
    return listing.google_maps_link
  }

  if (listing?.latitude && listing?.longitude) {
    return `https://maps.google.com/maps?q=${listing.latitude},${listing.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`
  }

  if (listing?.address) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(listing.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
  }

  return ''
}

export function getListingImages(listing: any, fallback: string[]): string[] {
  if (Array.isArray(listing?.images) && listing.images.length > 0) {
    return listing.images.filter(Boolean)
  }
  if (typeof listing?.cover_image === 'string' && listing.cover_image) {
    return [listing.cover_image]
  }
  return fallback
}
