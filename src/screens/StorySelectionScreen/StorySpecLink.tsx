import React from "react";
import { Link } from "react-router-dom";

import { StorySpecification } from "pathiverse/system/StorySpecification";

export interface StorySpecLinkProps {
  storySpec: StorySpecification<any>;
}

export function StorySpecLink({ storySpec }: StorySpecLinkProps) {
  return (
    <Link className="story-spec-link" to={`/story/${storySpec.id}`}>
      {storySpec.name}
    </Link>
  );
}
