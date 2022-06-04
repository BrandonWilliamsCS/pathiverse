import { InterfaceElement } from "system/InterfaceElement";
import { DirectContent } from "../DirectContent";

/** Describes content that is of the "plain text" variety. */
export const plainTextContentType = "pathiverse.content.text/plain" as const;

/** A piece of content made of text that does not need to be processed or interpreted. */
export interface PlainTextContent extends DirectContent {
  type: typeof plainTextContentType;
  value: string;
}

/** Detects whether a piece of content is of the "plain text" variety. */
export function isPlainTextContent(
  content: InterfaceElement,
): content is PlainTextContent {
  return content && content.type === plainTextContentType;
}
