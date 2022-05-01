export async function getJsonResource<T>(uri: string): Promise<T> {
  const result = await fetch(uri);
  return await result.json();
}
