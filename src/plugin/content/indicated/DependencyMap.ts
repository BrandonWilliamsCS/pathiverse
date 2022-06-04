import { ResourceIndicator } from "system/resource/ResourceIndicator";

export interface DependencyMap {
  indicatedContentReader: (indicator: ResourceIndicator) => Promise<string>;
}
