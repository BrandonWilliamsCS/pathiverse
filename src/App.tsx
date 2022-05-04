import React from "react";

import { hostSetup } from "hostSetup";
import { StoryState } from "kernel/story/StoryState";
import { HostServicesBuilder } from "platform/react/HostServicesBuilder";
import { ContentWithResponseScene } from "plugin/scene/contentWithResponse/ContentWithResponseScene";
import { ConsumptionScreen } from "screens/ConsumptionScreen/ConsumptionScreen";
import { useFunctionInitRef } from "util/useFunctionInitRef";

function App() {
  const hostServices = useFunctionInitRef(() => {
    const builder = new HostServicesBuilder<
      StoryState<ContentWithResponseScene, void>
    >();
    hostSetup(builder);
    return builder.build();
  }).current;

  return <ConsumptionScreen hostServices={hostServices} />;
}

export default App;
