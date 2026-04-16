export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'sh8x2q4m7v',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Switch High',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Editorial creator platform',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A blended publishing platform for articles, identity pages, and creator discovery.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'switchhigh.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://switchhigh.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

