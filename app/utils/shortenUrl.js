export function generateShortUrl(url) {
    const randomString = Math.random().toString(36).substring(2, 8);
    return `https://short-url-webapp.vercel.app/${randomString}`;
  }
  