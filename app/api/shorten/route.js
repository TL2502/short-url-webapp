import { NextResponse } from 'next/server';
import { generateShortUrl } from '../../utils/shortenUrl';

export async function POST(request) {
  const { url } = await request.json();
  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  const shortenedUrl = generateShortUrl(url);
  return NextResponse.json({ shortenedUrl });
}
