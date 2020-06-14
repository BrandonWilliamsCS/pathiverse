import { State, SceneState } from "../../State";
import { Renderer } from "../../kernel/Renderer";
import { StateMachine } from "../../kernel/StateMachine";
import { SubStateManagerMap } from "../state/CompoundStateManager";
import { StorageFactory } from "../storage/Storage";
import { buildContentResolver } from "./buildContentResolver";
import { buildStateManager } from "./buildStateManager";

/**
 * Creates a StateMachine from a few, key resources using basic assumptions.
 * @param sessionName A session name to use as a key
 * @param worldName A world name to use as a key
 * @param sessionSubStateManagerMap A map of sub-state keys to their session-specific StateManagers
 * @param worldSubStateManagerMap A map of sub-state keys to their world-specific StateManagers
 * @param stateStorageFactory For generating storage instances based on a state path
 * @param contentStorageFactory For generating storage instances based on a content name
 * @param renderer The renderer to use for the StateMachine
 */
export function buildStateMachine<
  AType extends string,
  CType extends string,
  S extends SceneState<AType, CType>
>(
  sessionName: string,
  worldName: string,
  sessionSubStateManagerMap: SubStateManagerMap<AType, S>,
  worldSubStateManagerMap: SubStateManagerMap<AType, S>,
  stateStorageFactory: StorageFactory<State>,
  contentStorageFactory: StorageFactory<string>,
  renderer: Renderer<AType, CType, S>,
) {
  const stateManager = buildStateManager<AType, CType, S>(
    sessionName,
    worldName,
    sessionSubStateManagerMap,
    worldSubStateManagerMap,
    stateStorageFactory,
  );
  const contentResolver = buildContentResolver<CType>(contentStorageFactory);
  const stateMachine = new StateMachine<AType, CType, S>(
    stateManager,
    contentResolver,
    renderer,
  );
  return stateMachine;
}
