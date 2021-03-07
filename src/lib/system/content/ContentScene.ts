import { Scene } from "lib/Scene";
import { ContentIndicator } from "./Content";

export interface ContentScene extends Scene {
  contentIndicator: ContentIndicator;
}
