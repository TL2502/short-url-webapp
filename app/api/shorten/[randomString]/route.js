import { NextResponse } from 'next/server';

const urlDatabase = {};  

export async function POST(request) {
  const { url } = await request.json();
  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  const randomString = Math.random().toString(36).substring(2, 8);
  urlDatabase[randomString] = url;

  return NextResponse.json({ shortenedUrl: `https://short-url-webapp.vercel.app/${randomString}` });
}

export async function GET(request) {
  const { pathname } = new URL(request.url);
  const randomString = pathname.split('/')[2];
  const longUrl = urlDatabase[randomString];

  if (longUrl) {
    return NextResponse.redirect(longUrl);
  } else {
    return NextResponse.json({ error: 'URL not found' }, { status: 404 });
  }
}
