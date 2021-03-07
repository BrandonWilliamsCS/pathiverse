import { ContentIndicator } from "./Content";

/**
 * Performs the first part of Content resolution: accessing raw data from a source.
 */
export abstract class ContentRetriever<R> {
  public abstract retrieve(indicator: ContentIndicator): Promise<R>;
}
