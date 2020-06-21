import { mapValues } from "lodash";

import { State, SceneState } from "../../State";
import { StateManager } from "../../kernel/StateManager";
import {
  SubStateManagerMap,
  CompoundStateManager,
} from "../state/CompoundStateManager";
import { SessionSplitStateManager } from "../state/SessionSplitStateManager";
import { StoredStateManager } from "../state/StoredStateManager";
import { StorageFactory } from "../storage/Storage";

/**
 * Creates a StateManager from a few, key resources using basic assumptions.
 * @param sessionName A session name to use as a key
 * @param worldName A world name to use as a key
 * @param sessionSubStateManagerMap A map of sub-state keys to their session-specific StateManagers
 * @param baseWorldStateManager A StageManager for the state of the "world"
 * @param stateStorageFactory For generating storage instances based on a state path
 */
export function buildStateManager<
  AType extends string,
  CType extends string,
  SSession extends SceneState<AType, CType>,
  SWorld extends State
>(
  sessionName: string,
  worldName: string,
  sessionSubStateManagerMap: SubStateManagerMap<AType, SSession>,
  baseWorldStateManager: StateManager<AType, SWorld>,
  stateStorageFactory: StorageFactory<State>,
): StateManager<AType, SSession & SWorld> {
  const combinedSessionStateManager = new CompoundStateManager(
    sessionSubStateManagerMap,
  );
  const sessionStateManager = buildStoredStateManager(
    worldName,
    sessionName,
    stateStorageFactory as StorageFactory<SSession>,
    combinedSessionStateManager,
  );
  const worldStateManager = buildStoredStateManager(
    worldName,
    undefined,
    stateStorageFactory as StorageFactory<SWorld>,
    baseWorldStateManager,
  );
  return new SessionSplitStateManager(sessionStateManager, worldStateManager);
}

function buildStoredStateManager<AType extends string, S>(
  worldName: string,
  sessionName: string | undefined,
  stateStorageFactory: StorageFactory<S>,
  baseStateManager: StateManager<AType, S>,
): StateManager<AType, S> {
  const storagePath = getStoragePath(worldName, sessionName);
  const storage = stateStorageFactory(storagePath);
  const manager = new StoredStateManager(baseStateManager, storage);
  return manager;
}

function getStoragePath(worldName: string, sessionName: string | undefined) {
  return sessionName ? `/Sessions/${sessionName}` : `/Worlds/${worldName}`;
}
