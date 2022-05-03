import { Scene } from "kernel/Scene";
import { Content } from "system/Content";
import { InteractionOption } from "system/InteractionOption";

/** Describes a scene that presents content along with a list of options for response interactions */
export const contentWithResponseSceneType =
  "pathiverse.scene.contentWithResponse";

/** A scene that presents content along with a list of options for response interactions */
export interface ContentWithResponseScene extends Scene {
  type: typeof contentWithResponseSceneType;
  content: Content;
  responsePrompt?: string;
  responseOptions: InteractionOption[];
}
