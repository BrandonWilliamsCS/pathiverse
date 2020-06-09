import { Content } from "../../Content";

export abstract class ContentBuilder<CType extends string, R> {
  public abstract build(type: CType, rawData: R): Promise<Content<CType>>;
}
