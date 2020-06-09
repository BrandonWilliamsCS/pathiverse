import { ContentResovler } from "../../kernel/ContentResolver";
import { Content, ContentIndicator } from "../../Content";
import { ContentBuilder } from "./ContentBuilder";
import { ContentRetriever } from "./ContentRetriever";

export class SimpleContentResolution<CType extends string, R> {
  public get resolver(): ContentResovler<CType> {
    return this.resolve;
  }

  public constructor(
    private readonly retriever: ContentRetriever<CType, R>,
    private readonly builder: ContentBuilder<CType, R>,
  ) {
    this.resolve = this.resolve.bind(this);
  }

  public async resolve(
    indicator: ContentIndicator<CType>,
  ): Promise<Content<CType>> {
    const rawData = await this.retriever.retrieve(indicator);
    const content = this.builder.build(indicator.type, rawData);
    return content;
  }
}
