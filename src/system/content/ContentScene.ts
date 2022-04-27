import { Scene } from "kernel/Scene";
import { ContentIndicator } from "./Content";

export interface ContentScene extends Scene {
  contentIndicator: ContentIndicator;
}
