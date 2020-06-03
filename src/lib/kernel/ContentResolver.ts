import { Content, ContentIndicator } from "../Content";

export type ContentResovler<CType extends string> = (
  indicator: ContentIndicator<CType>,
) => Promise<Content<CType>>;
