import { NextResponse } from 'next/server';  
import prisma from "../../lib/db";

interface RedirectPageProps {
  params: { shortUrl: string }; 
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortUrl } = params;

  const url = await prisma.url.findUnique({
    where: { shortUrl: shortUrl },
  });

  if (!url) {
    return <div>404 - URL not found</div>;
  }
  
  return NextResponse.redirect(url.originalUrl); 
}
