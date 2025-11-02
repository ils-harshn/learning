const GITHUB_RAW_BASE_URL =
  "https://raw.githubusercontent.com/harshcore/arsongs-src-copy/main/";

export async function fetchFromGitHub(
  subPath,
  filePath,
  range,
) {
  const githubUrl = `${GITHUB_RAW_BASE_URL}${subPath}/${filePath}`;
  const headers = {};

  if (range) headers.Range = range;

  const response = await fetch(githubUrl, { headers });

  if (!response.ok) {
    throw new Error(`File not found: ${filePath}`);
  }

  return response;
}
