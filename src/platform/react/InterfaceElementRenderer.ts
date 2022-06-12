import React from "react";

import { Action } from "pathiverse/kernel/Action";
import { InterfaceElement } from "pathiverse/system/InterfaceElement";

export interface InterfaceElementRenderArgs<S> {
  interfaceElement: InterfaceElement;
  state: S;
  actionHandler: (action: Action) => void;
  interfaceElementRenderer: InterfaceElementRenderer<S>;
}

/**
 * An abstraction around the logic to render an element of the UI.
 */
export interface InterfaceElementRenderer<S> {
  canRender: (interfaceElement: InterfaceElement) => boolean;
  render: (args: InterfaceElementRenderArgs<S>) => React.ReactNode;
}

export function buildCompositeInterfaceElementRenderer<S>(
  pieces: InterfaceElementRenderer<S>[],
): InterfaceElementRenderer<S> {
  return {
    canRender: (interfaceElement) =>
      pieces.some((renderer) => renderer.canRender(interfaceElement)),
    render: (args) =>
      pieces
        .find((renderer) => renderer.canRender(args.interfaceElement))!
        .render(args),
  };
}
