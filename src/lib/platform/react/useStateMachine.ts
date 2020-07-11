import React from "react";

import { Action } from "../../Action";
import { Content } from "../../Content";
import { SceneState } from "../../State";
import { ActionHandler } from "../../kernel/ActionHandler";
import { ContentResovler } from "../../kernel/ContentResolver";
import { Renderer } from "../../kernel/Renderer";
import { StateGenerator } from "../../kernel/StateGenerator";
import { StateMachine } from "../../kernel/StateMachine";

export function useStateMachine<S extends SceneState>(
  stateGenerator: StateGenerator<S>,
  resolveContent: ContentResovler,
): [[S, Content] | undefined, ActionHandler] {
  // Keep a handle on the stuff most recently passed to the "renderer"
  // Note that they will be undefined until the consumer first calls the provided actionHandler.
  const [renderedInfo, setRenderedInfo] = React.useState<{
    state: S | undefined;
    content: Content | undefined;
    actionHandler: ActionHandler | undefined;
  }>({ state: undefined, content: undefined, actionHandler: undefined });
  // Build the StateMachine as a pure product of the input so it sticks around the appropriate duration.
  const stateMachine = React.useMemo(() => {
    const internalRenderer: Renderer<S> = (
      stateToRender,
      contentToRender,
      actionHandler,
    ) => {
      setRenderedInfo({
        state: stateToRender,
        content: contentToRender,
        actionHandler,
      });
      return Promise.resolve();
    };
    return new StateMachine(stateGenerator, resolveContent, internalRenderer);
  }, [stateGenerator, resolveContent, setRenderedInfo]);

  // Both or neither of state and content should be defined, so pack them up together
  const toRender: [S, Content] | undefined = renderedInfo.state &&
    renderedInfo.content && [renderedInfo.state, renderedInfo.content];
  // Before the StateMachine can provide a handler, provide one that will get the ball rolling.
  const actionHandler: ActionHandler =
    renderedInfo.actionHandler ||
    ((action: Action) => {
      stateMachine.start(action);
    });

  return [toRender, actionHandler];
}
