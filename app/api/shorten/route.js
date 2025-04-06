import { NextResponse } from 'next/server';
import { generateShortUrl } from '../../utils/shortenUrl';

const urlDatabase = {};  

export async function POST(request) {
  const { url } = await request.json();
  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  const shortenedUrl = generateShortUrl(url);
  
  urlDatabase[shortenedUrl] = url;

  return NextResponse.json({ shortenedUrl });
}

export async function GET(request) {
  const { pathname } = new URL(request.url);

  const longUrl = urlDatabase[pathname];

  if (longUrl) {
    return NextResponse.redirect(longUrl);
  } else {
    return NextResponse.json({ error: 'URL not found' }, { status: 404 });
  }
}
