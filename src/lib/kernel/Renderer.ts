import { Content } from "../Content";
import { SceneState } from "../State";
import { ActionHandler } from "./ActionHandler";

/**
 * Represents any mechanism that presents state-based content to a user and translates intreactions into an Action type.
 */
export type Renderer<S extends SceneState> = (
  currentState: S,
  content: Content,
  actionHandler: ActionHandler,
) => Promise<void>;
