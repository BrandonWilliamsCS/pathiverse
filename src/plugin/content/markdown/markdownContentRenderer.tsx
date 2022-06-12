import React from "react";

import { InterfaceElementRenderer } from "platform/react/InterfaceElementRenderer";
import { isMarkdownContent, MarkdownContent } from "./MarkdownContent";
import { MarkdownContentDisplay } from "./MarkdownContentDisplay";

export const markdownContentRenderer: InterfaceElementRenderer<any> = {
  canRender: isMarkdownContent,
  render: ({ interfaceElement }) => (
    <MarkdownContentDisplay content={interfaceElement as MarkdownContent} />
  ),
};
