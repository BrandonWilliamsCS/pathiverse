import { Content } from "./Content";
import { ContentBuilder } from "./ContentBuilder";

/**
 * "Builds" content by treating the raw data as a simple value.
 */
export class SimpleContentBuilder extends ContentBuilder<string> {
  public build(type: string, rawData: string): Promise<Content> {
    return Promise.resolve({ type, value: rawData });
  }
}
