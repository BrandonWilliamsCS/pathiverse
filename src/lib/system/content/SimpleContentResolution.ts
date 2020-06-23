import { ContentResovler } from "../../kernel/ContentResolver";
import { Content, ContentIndicator } from "../../Content";
import { ContentBuilder } from "./ContentBuilder";
import { ContentRetriever } from "./ContentRetriever";

/**
 * Splits content resolution into two parts: retrieval and formatting.
 */
export class SimpleContentResolution<R> {
  public get resolver(): ContentResovler {
    return this.resolve;
  }

  public constructor(
    private readonly retriever: ContentRetriever<R>,
    private readonly builder: ContentBuilder<R>,
  ) {
    this.resolve = this.resolve.bind(this);
  }

  public async resolve(indicator: ContentIndicator): Promise<Content> {
    const rawData = await this.retriever.retrieve(indicator);
    const content = this.builder.build(indicator.type, rawData);
    return content;
  }
}
