import { Scene } from "pathiverse/kernel/Scene";
import { InterfaceElement } from "pathiverse/system/InterfaceElement";

/** Describes a scene that presents content along with a list of options for response interactions */
export const contentWithResponseSceneType =
  "pathiverse.scene.contentWithResponse";

/** A scene that presents content along with a list of options for response interactions */
export interface ContentWithResponseScene extends Scene {
  type: typeof contentWithResponseSceneType;
  content: InterfaceElement;
  responsePrompt?: string;
  responseOptions: InterfaceElement[];
}

/** Detects whether a scene is of the "content with response" variety. */
export function isContentWithResponseScene(
  scene: InterfaceElement,
): scene is ContentWithResponseScene {
  return scene && scene.type === contentWithResponseSceneType;
}
