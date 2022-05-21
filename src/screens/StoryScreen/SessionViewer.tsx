import React from "react";

import { Session } from "host/Session";
import { Scene } from "kernel/Scene";
import { StateSessionTrackerViewer } from "platform/react/StateSessionTrackerViewer";

export interface SessionViewerProps<Sc extends Scene, U> {
  session: Session<Sc, U>;
}

export function SessionViewer<Sc extends Scene, U>({
  session,
}: SessionViewerProps<Sc, U>) {
  return (
    <div className="story">
      <h2 className="story-name">{session.storySpecification.name}</h2>
      <div className="story-content">
        <StateSessionTrackerViewer
          stateSessionTracker={session.stateSessionTracker}
        />
      </div>
    </div>
  );
}
