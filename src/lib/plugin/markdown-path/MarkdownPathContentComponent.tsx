import React from "react";
import Markdown from "react-markdown";
import { SceneState } from "lib/State";

import { ActionHandler } from "../../kernel/ActionHandler";
import { MarkdownPathContent } from "./MarkdownPathContent";
import { isSelectPathAction } from "./SelectPathAction";

export const MarkdownPathContentComponent: React.FC<MarkdownPathContentComponentProps> = ({
  actionHandler,
  content,
  state,
}) => {
  const selectPathActions = state.currentScene.possibleActions.filter(
    isSelectPathAction,
  );
  return (
    <>
      <Markdown source={content.markdown} />
      {selectPathActions.map((action) => (
        <button
          key={action.label}
          type="button"
          onClick={() => {
            actionHandler(action);
          }}
        >
          {action.label}
        </button>
      ))}
    </>
  );
};

export interface MarkdownPathContentComponentProps {
  actionHandler: ActionHandler;
  content: MarkdownPathContent;
  state: SceneState;
}
