import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, path, tag } = body;

    // Verify secret token for security
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Revalidate by tag or path
    if (tag) {
      revalidateTag(tag, 'default');
      return NextResponse.json({ 
        revalidated: true, 
        type: 'tag',
        target: tag,
        now: Date.now() 
      });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ 
        revalidated: true, 
        type: 'path',
        target: path,
        now: Date.now() 
      });
    }

    return NextResponse.json(
      { message: 'Missing tag or path parameter' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
}
