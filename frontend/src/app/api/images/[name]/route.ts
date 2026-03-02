import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ name: string }> }
) {
    const { name } = await params;

    // Sanitize filename - only allow alphanumeric, dash, underscore, dot
    if (!/^[a-zA-Z0-9_.-]+$/.test(name)) {
        return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    const imagePath = path.join(process.cwd(), 'public', name);

    try {
        const imageBuffer = await readFile(imagePath);

        const ext = path.extname(name).toLowerCase();
        const contentType =
            ext === '.png' ? 'image/png' :
                ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
                    ext === '.webp' ? 'image/webp' :
                        ext === '.svg' ? 'image/svg+xml' :
                            'application/octet-stream';

        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch {
        return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
}
