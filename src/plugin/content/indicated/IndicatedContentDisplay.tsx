import { useDependencies } from "lib/unobtrusive-di-container/react";
import React from "react";

import { Action } from "kernel/Action";
import { InterfaceElementRenderer } from "platform/react/InterfaceElementRenderer";
import { DirectContent } from "../DirectContent";
import { DependencyMap } from "./DependencyMap";
import { IndicatedContent } from "./IndicatedContent";

export interface IndicatedContentDisplayProps<S> {
  actionHandler: (action: Action) => void;
  content: IndicatedContent;
  interfaceElementRenderer: InterfaceElementRenderer<S>;
  state: S;
}

/** Displays indirectly indicated content by loading and then displaying content. */
export function IndicatedContentDisplay<S>({
  actionHandler,
  content,
  interfaceElementRenderer,
  state,
}: IndicatedContentDisplayProps<S>) {
  const [isProcessing, setIsProcessing] = React.useState(true);
  const [directContent, setDirectContent] = React.useState<DirectContent>();
  const indicatedContentReader = useDependencies<DependencyMap>()(
    "indicatedContentReader",
  );
  React.useEffect(() => {
    (async () => {
      try {
        setIsProcessing(true);
        const contentValue = await indicatedContentReader(content.indicator);
        setDirectContent({
          type: content.directContentType,
          value: contentValue,
        });
      } finally {
        setIsProcessing(false);
      }
    })();
  }, [indicatedContentReader, content]);
  return isProcessing ? (
    <div className="content processing"></div>
  ) : (
    <>
      {interfaceElementRenderer.render({
        interfaceElement: directContent!,
        state,
        actionHandler,
        interfaceElementRenderer,
      })}
    </>
  );
}
