import { GetServerSideProps } from 'next';
import prisma from "../../lib/db";
import { NextResponse } from 'next/server';

interface RedirectPageProps {
  shortUrl: string;
  originalUrl: string;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { shortUrl } = params as { shortUrl: string };

  const url = await prisma.url.findUnique({
    where: { shortUrl: shortUrl },
  });

  if (!url) {
    return {
      notFound: true, 
    };
  }

  return {
    props: {
      shortUrl: shortUrl,
      originalUrl: url.originalUrl,
    },
  };
};

export default function RedirectPage({ originalUrl }: RedirectPageProps) {
  if (originalUrl) {
    return NextResponse.redirect(originalUrl);
  }

  return <div>404 - URL not found</div>;
}
