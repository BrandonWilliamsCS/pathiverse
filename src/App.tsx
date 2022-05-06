import React from "react";

import { HostedStateType, hostSetup } from "hostSetup";
import { HostServicesBuilder } from "platform/react/HostServicesBuilder";
import { ConsumptionScreen } from "screens/ConsumptionScreen/ConsumptionScreen";
import { useFunctionInitRef } from "util/useFunctionInitRef";

function App() {
  const hostServices = useFunctionInitRef(() => {
    const builder = new HostServicesBuilder<HostedStateType>();
    hostSetup(builder);
    return builder.build();
  }).current;

  return <ConsumptionScreen hostServices={hostServices} />;
}

export default App;
