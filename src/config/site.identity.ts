export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'sh8x2q4m7v',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Switch High',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Articles with a stronger creator layer',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A publishing platform that blends long-form articles with profile-driven discovery and author presence.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'switchhigh.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://switchhigh.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

