import React from "react";

import { Content } from "system/Content";

/**
 * An abstraction around the logic to render a piece of `Content`.
 */
export interface ContentRenderer {
  canRender: (content: Content) => boolean;
  render: (content: Content) => React.ReactNode;
}
