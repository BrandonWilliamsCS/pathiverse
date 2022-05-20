import { DependencyProvider } from "lib/unobtrusive-di-container/react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DependencyMap } from "host/DependencyMap";
import {
  registerDependencies,
  HostedSceneType,
  HostedUserStateType,
} from "host/hostSetup";
import { StoryScreen } from "screens/StoryScreen/StoryScreen";
import { StorySelectionScreen } from "screens/StorySelectionScreen/StorySelectionScreen";

function App() {
  return (
    <DependencyProvider<DependencyMap<HostedSceneType, HostedUserStateType>>
      registerDependencies={registerDependencies}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StorySelectionScreen />} />
          <Route path="/story/:storyId" element={<StoryScreen />} />
        </Routes>
      </BrowserRouter>
    </DependencyProvider>
  );
}

export default App;
