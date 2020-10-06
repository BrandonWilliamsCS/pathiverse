import React from "react";
import Markdown from "react-markdown";

import { ActionHandler } from "../../kernel/ActionHandler";
import { MarkdownPathContent } from "./MarkdownPathContent";

export const MarkdownPathContentComponent: React.FC<MarkdownPathContentComponentProps> = ({
  actionHandler,
  content,
}) => {
  return <Markdown source={content.markdown} />;
};

export interface MarkdownPathContentComponentProps {
  actionHandler: ActionHandler;
  content: MarkdownPathContent;
}
