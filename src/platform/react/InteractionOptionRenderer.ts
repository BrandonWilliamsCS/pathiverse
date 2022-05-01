import React from "react";

import { Action } from "kernel/Action";
import { InteractionOption } from "system/InteractionOption";

/**
 * An abstraction around the logic to render an `InteractionOption`.
 */
export interface InteractionOptionRenderer {
  canRender: (interactionOption: InteractionOption) => boolean;
  render: (
    interactionOption: InteractionOption,
    actionHandler: (action: Action) => Promise<void>,
  ) => React.ReactNode;
}
