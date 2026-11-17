// Company facts used across the site.
// The domain, email address and street area are placeholders until confirmed.

export const SITE = {
  name:         'MiraiTech',
  tagline:      'AI engineering in Tokyo',
  description:  'MiraiTech is a small engineering team in Tokyo. We build software on top of language models, along with the data pipelines and web apps it depends on.',
  url:          'https://mirai-tech.net',
  email:        'contact@mirai-tech.net',
  founded:      2022,
  status:       'Taking on new projects',
  languages:    'Japanese and English',
  responseTime: 'Within one business day',
  location: {
    area:     'Nakano, Tokyo',
    country:  'Japan',
    short:    'Tokyo, Japan',
    timeZone: 'Asia/Tokyo',
    utc:      'JST (UTC+9)',
    mapsUrl:  'https://www.google.com/maps/search/?api=1&query=Nakano+City%2C+Tokyo%2C+Japan',
  },
} as const
