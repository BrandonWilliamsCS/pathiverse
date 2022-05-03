import React from "react";

import { PlainTextContent } from "./PlainTextContent";

export interface PlainTextContentDisplayProps {
  content: PlainTextContent;
}

/** Displays "plain text" content by simply rendering the text directly. */
export const PlainTextContentDisplay: React.FC<
  PlainTextContentDisplayProps
> = ({ content }) => {
  return <>{content.value}</>;
};
