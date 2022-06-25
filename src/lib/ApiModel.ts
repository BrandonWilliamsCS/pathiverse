export abstract class ApiModel {
  public constructor(public readonly baseUrl: string) {}

  protected async getJsonResource<T>(path: string): Promise<T> {
    const result = await fetch(this.joinPaths([this.baseUrl, path]));
    return await result.json();
  }

  protected async getRawResource(path: string): Promise<string> {
    const result = await fetch(this.joinPaths([this.baseUrl, path]));
    return await result.text();
  }

  protected joinPaths(parts: string[]) {
    const separator = "/";
    parts = parts.map((part, i) => {
      // Remove leading slashes, except for the first part
      if (i > 0 && part.startsWith(separator)) {
        part = part.substring(separator.length);
      }
      // Remove trailing slashes, except for the first part
      if (i !== parts.length - 1 && part.endsWith(separator)) {
        part = part.substring(0, part.length - separator.length);
      }
      return part;
    });
    return parts.join(separator);
  }
}
