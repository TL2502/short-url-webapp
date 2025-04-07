import { nanoid } from "nanoid";
import prisma from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    const {url} = await request.json();

    const shortUrl = nanoid(8)
    const shortenUrl = await prisma.url.create({
        data: {
            originalUrl: url,
            shortUrl
        }
    })

    return NextResponse.json({ shortUrl: shortenUrl.shortUrl})
}