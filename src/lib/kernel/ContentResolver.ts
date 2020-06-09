import { Content, ContentIndicator } from "../Content";

/**
 * A low-level abstraction for transforming a content "indicator" into actual content.
 */
export type ContentResovler<CType extends string> = (
  indicator: ContentIndicator<CType>,
) => Promise<Content<CType>>;
