import React from "react";

import { InterfaceElementRenderer } from "platform/react/InterfaceElementRenderer";
import { isPlainTextContent, PlainTextContent } from "./PlainTextContent";
import { PlainTextContentDisplay } from "./PlainTextContentDisplay";

export const plainTextContentRenderer: InterfaceElementRenderer<any> = {
  canRender: isPlainTextContent,
  render: ({ interfaceElement }) => (
    <PlainTextContentDisplay content={interfaceElement as PlainTextContent} />
  ),
};
