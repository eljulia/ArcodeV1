import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const secret = process.env.REVALIDATE_SECRET;

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const paths: string[] = body.paths ?? ["/"];

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({ ok: true, revalidated: paths });
  } catch (err) {
    console.error("/api/revalidate error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
