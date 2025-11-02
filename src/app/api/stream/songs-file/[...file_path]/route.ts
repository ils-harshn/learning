import { NextResponse } from "next/server";

const GITHUB_RAW_BASE_URL =
  "https://raw.githubusercontent.com/harshcore/arsongs-src-copy/main/";

export async function GET(
  req: Request,
  context: { params: Promise<{ file_path: string[] }> }
) {
  const { file_path } = await context.params;
  const filePath = file_path.join("/");

  const githubUrl = `${GITHUB_RAW_BASE_URL}songs-file/${filePath}`;

  // Get file info
  const headRes = await fetch(githubUrl, { method: "HEAD" });
  if (!headRes.ok) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileSize = parseInt(headRes.headers.get("content-length") || "0");
  const contentType =
    headRes.headers.get("content-type") || "application/octet-stream";
  const range = req.headers.get("range");

  let start = 0;
  let end = fileSize - 1;
  const headers: Record<string, string> = {};

  // Handle Range header (for audio seeking)
  if (range) {
    const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
    start = parseInt(startStr);
    end = endStr ? parseInt(endStr) : end;
    headers.Range = `bytes=${start}-${end}`;
  }

  const response = await fetch(githubUrl, { headers });
  if (!response.ok || !response.body) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const resHeaders = {
    "Content-Type": contentType,
    "Content-Length": String(end - start + 1),
    "Accept-Ranges": "bytes",
    ...(range ? { "Content-Range": `bytes ${start}-${end}/${fileSize}` } : {}),
    "Content-Disposition": `inline; filename="${filePath.split("/").pop()}"`,

    // 💥 The CORS fix
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Range",
  };

  return new NextResponse(response.body, {
    status: range ? 206 : 200,
    headers: resHeaders,
  });
}

// 👇 Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Range",
    },
  });
}
