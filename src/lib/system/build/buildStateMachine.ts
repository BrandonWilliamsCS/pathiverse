import { State, SceneState } from "../../State";
import { Renderer } from "../../kernel/Renderer";
import { StateMachine } from "../../kernel/StateMachine";
import { StateManager } from "../../kernel/StateManager";
import { SubStateManagerMap } from "../state/CompoundStateManager";
import { StorageFactory } from "../storage/StorageFactory";
import { buildContentResolver } from "./buildContentResolver";
import { buildStateManager } from "./buildStateManager";

/**
 * Creates a StateMachine from a few, key resources using basic assumptions.
 * @param sessionName A session name to use as a key
 * @param worldName A world name to use as a key
 * @param sessionSubStateManagerMap A map of sub-state keys to their session-specific StateManagers
 * @param baseWorldStateManager A StageManager for the state of the "world"
 * @param stateStorageFactory For generating storage instances based on a state path
 * @param contentStorageFactory For generating storage instances based on a content name
 * @param renderer The renderer to use for the StateMachine
 */
export function buildStateMachine<
  SSession extends SceneState,
  SWorld extends State
>(
  sessionName: string,
  worldName: string,
  sessionSubStateManagerMap: SubStateManagerMap<SSession>,
  baseWorldStateManager: StateManager<SWorld>,
  stateStorageFactory: StorageFactory<State>,
  contentStorageFactory: StorageFactory<string>,
  renderer: Renderer<SSession & SWorld>,
) {
  const stateManager = buildStateManager<SSession, SWorld>(
    sessionName,
    worldName,
    sessionSubStateManagerMap,
    baseWorldStateManager,
    stateStorageFactory,
  );
  const contentResolver = buildContentResolver(contentStorageFactory);
  const stateMachine = new StateMachine(
    stateManager,
    contentResolver,
    renderer,
  );
  return stateMachine;
}
