/**
 * Site-wide brand and contact constants.
 * Single source of truth for the company name, location, and contact details.
 */

export const SITE = {
  name:        'MiraiTech',
  tagline:     'AI-Focused Software Engineering — Tokyo',
  description: 'An AI-focused software engineering team in Tokyo, building production systems across AI, full-stack, and data.',
  url:         'https://mirai-tech.net',
  email:       'contact@mirai-tech.net',
  founded:     2022,
  status:      'Accepting new projects',
  languages:   'Japanese / English',
  location: {
    area:     'Nakano, Tokyo',
    country:  'Japan',
    short:    'Tokyo, Japan',
    timeZone: 'Asia/Tokyo',
    utc:      'JST (UTC+9)',
    mapsUrl:  'https://www.google.com/maps/search/?api=1&query=Nakano+City%2C+Tokyo%2C+Japan',
  },
} as const
