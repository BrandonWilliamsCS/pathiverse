import { Content } from "../../Content";

export interface MarkdownPathContent extends Content {
  readonly type: "markdown-path";
  markdown: string;
}

export function isMarkdownPathContent(
  content: Content,
): content is MarkdownPathContent {
  return content.type === "markdown-path";
}
