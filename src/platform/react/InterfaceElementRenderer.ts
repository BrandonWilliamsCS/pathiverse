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
  ) => React.ReactNode;
}
