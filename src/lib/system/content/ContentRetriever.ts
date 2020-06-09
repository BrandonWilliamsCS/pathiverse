import { ContentIndicator } from "../../Content";

export abstract class ContentRetriever<CType extends string, R> {
  public abstract retrieve(indicator: ContentIndicator<CType>): Promise<R>;
}
