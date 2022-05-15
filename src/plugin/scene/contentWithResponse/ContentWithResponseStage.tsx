import React from "react";

import { Action } from "kernel/Action";
import { InterfaceElementRenderer } from "platform/react/InterfaceElementRenderer";
import { ContentWithResponseScene } from "./ContentWithResponseScene";

export interface ContentWithResponseStageProps {
  scene: ContentWithResponseScene;
  actionHandler: (action: Action) => Promise<void>;
  interfaceElementRenderer: InterfaceElementRenderer;
}

/** Renders a `ContentWithResponseScene` by expressing its content followed by a list of response options. */
export function ContentWithResponseStage({
  actionHandler,
  interfaceElementRenderer,
  scene,
}: ContentWithResponseStageProps) {
  return (
    <section className="stage contentWithResponse">
      <article className="content">
        <h3 className="scene-name">{scene.name}</h3>
        {interfaceElementRenderer.render(
          scene.content,
          actionHandler,
          interfaceElementRenderer,
        )}
      </article>
      <nav>
        {scene.responsePrompt && (
          <h4 className="responsePrompt">{scene.responsePrompt}</h4>
        )}
        {scene.responseOptions.length > 0 && (
          <ul className="responseOptions">
            {scene.responseOptions.map((responseOption, i) => (
              <li key={i} className="responseOption">
                {interfaceElementRenderer.render(
                  responseOption,
                  actionHandler,
                  interfaceElementRenderer,
                )}
              </li>
            ))}
          </ul>
        )}
      </nav>
    </section>
  );
}
