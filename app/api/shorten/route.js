// app/api/shorten/route.js
import { NextResponse } from 'next/server';

const urlDatabase = {}; 

export async function POST(req) {
  try {
    const { url } = await req.json();
    
    try {
      new URL(url); 
    } catch (error) {
      return NextResponse.json({ error: 'Invalid URL format. Please check your input' }, { status: 400 });
    }

    const shortUrlKey = Math.random().toString(36).substring(2, 8); 
    const shortUrl = `https://short-url-webapp.vercel.app/${shortUrlKey}`;
    
    urlDatabase[shortUrlKey] = url;

    return NextResponse.json({ shortUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process the request' }, { status: 500 });
  }
}

export async function GET(req) {
    const { pathname } = new URL(req.url);
    const shortUrlKey = pathname.split('/')[2];
  
    if (!shortUrlKey || !urlDatabase[shortUrlKey]) {
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }
  
    const longUrl = urlDatabase[shortUrlKey];
    
    if (!longUrl) {
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }
  
    return NextResponse.redirect(longUrl);
  }
  
