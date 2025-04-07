import { redirect } from 'next/navigation';
import prisma from "../../lib/db";

interface PageProps {
  params: { shortUrl: string };
}

export default async function RedirectPage({ params }: PageProps) {
  const { shortUrl } = await params;

  const url = await prisma.url.findUnique({
    where: { shortUrl: shortUrl },
  });

  if (!url) {
    return <div>404 - URL not found</div>;
  }

  redirect(url.originalUrl);
}
