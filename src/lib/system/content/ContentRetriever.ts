import { ContentIndicator } from "../../Content";

/**
 * Performs the first part of Content resolution: accessing raw data from a source.
 */
export abstract class ContentRetriever<CType extends string, R> {
  public abstract retrieve(indicator: ContentIndicator<CType>): Promise<R>;
}
