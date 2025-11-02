import { NextResponse } from "next/server";
import { fetchFromGitHub } from "@/lib/githubStream";

export async function GET(
  req: Request,
  context: { params: Promise<{ file_path: string[] }> }
) {
  const { file_path } = await context.params;
  const filePath = file_path.join("/");

  try {
    const response = await fetchFromGitHub("album-images", filePath);

    const headers = {
      "Content-Type":
        response.headers.get("content-type") || "application/octet-stream",
      "Content-Disposition": `inline; filename="${filePath.split("/").pop()}"`,

      // 🧠💥 The CORS unlock keys right here
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    return new NextResponse(response.body, { headers });
  } catch (error) {
    return NextResponse.json(
      { error: "File not found" },
      {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}

// 💀 Handle preflight CORS check (OPTIONS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
