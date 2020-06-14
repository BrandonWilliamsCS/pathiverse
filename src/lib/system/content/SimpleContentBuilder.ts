import { Content } from "../../Content";

/**
 * "Builds" content by treating the raw data is a simple value.
 */
export class SimpleContentBuilder<CType extends string> {
  public build(type: CType, rawData: string): Promise<Content<CType>> {
    return Promise.resolve({ type, value: rawData });
  }
}
