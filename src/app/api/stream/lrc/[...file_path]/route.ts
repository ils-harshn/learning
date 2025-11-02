import { NextResponse } from "next/server";
import { fetchFromGitHub } from "@/lib/githubStream";

export async function GET(
  req: Request,
  context: { params: Promise<{ file_path: string[] }> }
) {
  const { file_path } = await context.params; // ✅ Await the promise
  const filePath = file_path.join("/");

  try {
    const response = await fetchFromGitHub("album-images", filePath);
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/octet-stream",
        "Content-Disposition": `inline; filename="${filePath.split("/").pop()}"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
