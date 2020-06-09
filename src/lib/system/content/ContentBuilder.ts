import { Content } from "../../Content";

/**
 * Performs the second part of Content resolution: converting raw data to a useful format.
 */
export abstract class ContentBuilder<CType extends string, R> {
  public abstract build(type: CType, rawData: R): Promise<Content<CType>>;
}
