import React from "react";
import ReactMarkdown from "react-markdown";

import { MarkdownContent } from "./MarkdownContent";

export interface MarkdownContentDisplayProps {
  content: MarkdownContent;
}

/** Displays "markdown" content by interpreting as CommonMark */
export const MarkdownContentDisplay: React.FC<MarkdownContentDisplayProps> = ({
  content,
}) => {
  return <ReactMarkdown>{content.value}</ReactMarkdown>;
};
