import { DependencyProvider } from "lib/unobtrusive-di-container/react";
import React from "react";

import {
  registerDependencies,
  HostedSceneType,
  HostedUserStateType,
} from "hostSetup";
import { StoryScreen } from "screens/StoryScreen/StoryScreen";
import { DependencyMap } from "./DependencyMap";

function App() {
  return (
    <DependencyProvider<DependencyMap<HostedSceneType, HostedUserStateType>>
      registerDependencies={registerDependencies}
    >
      <StoryScreen
        storyIndicator={{
          type: "relativePath",
          requiresContext: true,
          value: "/baseball.json",
        }}
      />
    </DependencyProvider>
  );
}

export default App;
