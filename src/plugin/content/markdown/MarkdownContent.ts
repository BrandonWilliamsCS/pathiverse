import { InterfaceElement } from "pathiverse/system/InterfaceElement";
import { DirectContent } from "../DirectContent";

/** Describes content that is of the "markdown" variety. */
export const markdownContentType = "pathiverse.content.markdown" as const;

/** A piece of content made of text that does not need to be processed or interpreted. */
export interface MarkdownContent extends DirectContent {
  type: typeof markdownContentType;
  value: string;
}

/** Detects whether a piece of content is of the "markdown" variety. */
export function isMarkdownContent(
  content: InterfaceElement,
): content is MarkdownContent {
  return content && content.type === markdownContentType;
}
