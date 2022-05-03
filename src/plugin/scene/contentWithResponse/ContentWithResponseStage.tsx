import React from "react";

import { Action } from "kernel/Action";
import { ContentRenderer } from "platform/react/ContentRenderer";
import { InteractionOptionRenderer } from "platform/react/InteractionOptionRenderer";
import { ContentWithResponseScene } from "./ContentWithResponseScene";

export interface ContentWithResponseStageProps {
  scene: ContentWithResponseScene;
  actionHandler: (action: Action) => Promise<void>;
  contentRenderer: ContentRenderer;
  interactionOptionRenderer: InteractionOptionRenderer;
}

/** Renders a `ContentWithResponseScene` by expressing its content followed by a list of response options. */
export function ContentWithResponseStage({
  actionHandler,
  contentRenderer,
  interactionOptionRenderer,
  scene,
}: ContentWithResponseStageProps) {
  return (
    <section className="stage contentWithResponse">
      <article className="content">
        <h3 className="name">{scene.name}</h3>
        {contentRenderer.render(scene.content)}
      </article>
      <nav>
        {scene.responsePrompt && (
          <h4 className="responsePrompt">{scene.responsePrompt}</h4>
        )}
        {scene.responseOptions.length > 0 && (
          <ul className="responseOptions">
            {scene.responseOptions.map((responseOption, i) => (
              <li key={i} className="responseOption">
                {interactionOptionRenderer.render(
                  responseOption,
                  actionHandler,
                )}
              </li>
            ))}
          </ul>
        )}
      </nav>
    </section>
  );
}
