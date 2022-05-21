import React from "react";

import { StorySpecification } from "system/StorySpecification";
import { StorySpecLink } from "./StorySpecLink";

export interface StoryListViewerProps {
  storyList: StorySpecification<any>[];
}

export function StoryListViewer({ storyList }: StoryListViewerProps) {
  return (
    <div className="story-list">
      <h2 className="story-list-title">Story List</h2>
      <ul className="story-list-content">
        {storyList.map((storySpec) => (
          <li key={storySpec.id}>
            <StorySpecLink storySpec={storySpec} />
          </li>
        ))}
      </ul>
    </div>
  );
}
