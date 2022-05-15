import React from "react";

import { Action } from "kernel/Action";
import { InterfaceElement } from "system/InterfaceElement";

/**
 * An abstraction around the logic to render an element of the UI.
 */
export interface InterfaceElementRenderer {
  canRender: (interfaceElement: InterfaceElement) => boolean;
  render: (
    interfaceElement: InterfaceElement,
    actionHandler: (action: Action) => Promise<void>,
    interfaceElementRenderer: InterfaceElementRenderer,
  ) => React.ReactNode;
}

export function buildCompositeInterfaceElementRenderer(
  pieces: InterfaceElementRenderer[],
): InterfaceElementRenderer {
  return {
    canRender: (interfaceElement) =>
      pieces.some((renderer) => renderer.canRender(interfaceElement)),
    render: (interfaceElement, actionHandler, interfaceElementRenderer) =>
      pieces
        .find((renderer) => renderer.canRender(interfaceElement))!
        .render(interfaceElement, actionHandler, interfaceElementRenderer),
  };
}
