import { Scene } from "kernel/Scene";
import { InterfaceElement } from "system/InterfaceElement";

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
