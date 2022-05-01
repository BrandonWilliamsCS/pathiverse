import { Content } from "system/Content";

/** Describes content that is of the "plain text" variety. */
export const plainTextContentType = "pathiverse.content.text/plain" as const;

/** A piece of content made of text that does not need to be processed or interpreted. */
export interface PlainTextContent extends Content {
  type: typeof plainTextContentType;
  value: string;
}

/** Detects whether a piece of content is of the "plain text" variety. */
export function isPlainTextContent(
  content: Content,
): content is PlainTextContent {
  return content && content.type === plainTextContentType;
}
