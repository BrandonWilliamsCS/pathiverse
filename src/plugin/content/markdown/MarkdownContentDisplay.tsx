import React from "react";

import { MarkdownContent } from "./MarkdownContent";

export interface MarkdownContentDisplayProps {
  content: MarkdownContent;
}

/** Displays "markdown" content by simply rendering the text directly. */
export const MarkdownContentDisplay: React.FC<
  MarkdownContentDisplayProps
> = ({ content }) => {
  return <>{content.value}</>;
};
