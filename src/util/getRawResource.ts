export async function getRawResource(uri: string): Promise<string> {
  const result = await fetch(uri);
  return await result.text();
}
