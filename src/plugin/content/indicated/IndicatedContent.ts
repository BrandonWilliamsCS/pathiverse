import { InterfaceElement } from "system/InterfaceElement";
import { ResourceIndicator } from "system/resource/ResourceIndicator";

/** Describes content that indirectly indicates actual content */
export const indicatedContentType = "pathiverse.content.indicated" as const;

/** Content that indirectly indicates actual content */
export interface IndicatedContent extends InterfaceElement {
  type: typeof indicatedContentType;
  directContentType: string;
  indicator: ResourceIndicator;
}

/** Detects whether a piece of content is of the "indicated" variety. */
export function isIndicatedContent(
  content: InterfaceElement,
): content is IndicatedContent {
  return content && content.type === indicatedContentType;
}
