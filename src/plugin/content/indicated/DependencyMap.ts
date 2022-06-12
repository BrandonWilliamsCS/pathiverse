import { ResourceIndicator } from "pathiverse/system/resource/ResourceIndicator";

export interface DependencyMap {
  indicatedContentReader: (indicator: ResourceIndicator) => Promise<string>;
}
