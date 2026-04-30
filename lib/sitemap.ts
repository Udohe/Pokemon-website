import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://pokedex-lite.vercel.app', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://pokedex-lite.vercel.app/compare', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://pokedex-lite.vercel.app/favorites', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://pokedex-lite.vercel.app/auth/login', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: 'https://pokedex-lite.vercel.app/auth/signup', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];
}
