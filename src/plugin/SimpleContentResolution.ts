import { Content, ContentIndicator } from "system/content/Content";
import { ContentBuilder } from "system/content/ContentBuilder";
import { ContentResovler } from "system/content/ContentResolver";
import { ContentRetriever } from "system/content/ContentRetriever";

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
