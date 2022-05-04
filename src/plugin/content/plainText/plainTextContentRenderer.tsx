import React from "react";

import {
  isPlainTextContent,
  PlainTextContent,
} from "plugin/content/plainText/PlainTextContent";
import { PlainTextContentDisplay } from "plugin/content/plainText/PlainTextContentDisplay";
import { InterfaceElementRenderer } from "platform/react/InterfaceElementRenderer";

export const plainTextContentRenderer: InterfaceElementRenderer = {
  canRender: isPlainTextContent,
  render: (interfaceElement) => (
    <PlainTextContentDisplay content={interfaceElement as PlainTextContent} />
  ),
};
