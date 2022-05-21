import { useDependencies } from "lib/unobtrusive-di-container/react";
import React from "react";

import { Action } from "kernel/Action";
import { InterfaceElementRenderer } from "platform/react/InterfaceElementRenderer";
import { ContentWithResponseScene } from "./ContentWithResponseScene";
import { DependencyMap } from "./DependencyMap";

export interface ContentWithResponseStageProps<S> {
  actionHandler: (action: Action) => void;
  interfaceElementRenderer: InterfaceElementRenderer<S>;
  scene: ContentWithResponseScene;
  state: S;
}

/** Renders a `ContentWithResponseScene` by expressing its content followed by a list of response options. */
export function ContentWithResponseStage<S>({
  actionHandler,
  interfaceElementRenderer,
  scene,
  state,
}: ContentWithResponseStageProps<S>) {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const actionTransformer =
    useDependencies<DependencyMap>()("actionTransformer");
  const handleAction = async (action: Action) => {
    try {
      setIsProcessing(true);
      const transformedAction = await actionTransformer(action);
      actionHandler(transformedAction);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <section
      className={`stage contentWithResponse${
        isProcessing ? " processing" : ""
      }`}
    >
      <article className="content">
        <h3 className="scene-name">{scene.name}</h3>
        {interfaceElementRenderer.render({
          interfaceElement: scene.content,
          state,
          actionHandler: handleAction,
          interfaceElementRenderer,
        })}
      </article>
      <nav>
        {scene.responsePrompt && (
          <h4 className="responsePrompt">{scene.responsePrompt}</h4>
        )}
        {scene.responseOptions.length > 0 && (
          <ul className="responseOptions">
            {scene.responseOptions.map((responseOption, i) => (
              <li key={i} className="responseOption">
                {interfaceElementRenderer.render({
                  interfaceElement: responseOption,
                  state,
                  actionHandler: handleAction,
                  interfaceElementRenderer,
                })}
              </li>
            ))}
          </ul>
        )}
      </nav>
    </section>
  );
}
