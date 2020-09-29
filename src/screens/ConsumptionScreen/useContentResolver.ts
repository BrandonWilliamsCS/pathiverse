import React from "react";

import { ContentResovler } from "lib/kernel/ContentResolver";

export function useContentResolver(): ContentResovler {
  const [stateGenerator] = React.useState(createContentResovler);
  return stateGenerator;
}

function createContentResovler(): ContentResovler {
  // TODO: Do something with the indicator (initially, assume file+markdown, then expand indicator/content metadata)
  return (indicator) => Promise.resolve(indicator);
}
