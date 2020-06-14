import { mapValues } from "lodash";

import { State, SceneState } from "../../State";
import { StateManager } from "../../kernel/StateManager";
import {
  SubStateManagerMap,
  CompoundStateManager,
} from "../state/CompoundStateManager";
import { SessionSplitStateManager } from "../state/SessionSplitStateManager";
import { StoredStateManager } from "../state/StoredStateManager";
import { Storage, StorageFactory } from "../storage/Storage";

/**
 * Creates a StateManager from a few, key resources using basic assumptions.
 * @param sessionName A session name to use as a key
 * @param worldName A world name to use as a key
 * @param sessionSubStateManagerMap A map of sub-state keys to their session-specific StateManagers
 * @param worldSubStateManagerMap A map of sub-state keys to their world-specific StateManagers
 * @param stateStorageFactory For generating storage instances based on a state path
 */
export function buildStateManager<
  AType extends string,
  CType extends string,
  S extends SceneState<AType, CType>
>(
  sessionName: string,
  worldName: string,
  sessionSubStateManagerMap: SubStateManagerMap<AType, S>,
  worldSubStateManagerMap: SubStateManagerMap<AType, S>,
  stateStorageFactory: StorageFactory<State>,
): StateManager<AType, S> {
  const transformedSubStateManagerMap = mapValues(
    sessionSubStateManagerMap,
    (_, key) => {
      const sessionManager = buildStoredStateManager(
        key,
        worldName,
        sessionSubStateManagerMap,
        stateStorageFactory,
        sessionName,
      );
      const worldManager = buildStoredStateManager(
        key,
        worldName,
        worldSubStateManagerMap,
        stateStorageFactory,
        undefined,
      );
      const jointManager = new SessionSplitStateManager(
        sessionManager,
        worldManager,
      );
      return jointManager as SubStateManagerMap<AType, S>[keyof S];
    },
  ) as SubStateManagerMap<AType, S>;
  return new CompoundStateManager(transformedSubStateManagerMap);
}

function buildStoredStateManager<
  AType extends string,
  CType extends string,
  S extends SceneState<AType, CType>
>(
  key: string,
  worldName: string,
  subStateManagerMap: SubStateManagerMap<AType, S>,
  stateStorageFactory: StorageFactory<State>,
  sessionName: string | undefined,
): StateManager<AType, S[keyof S]> {
  const baseStateManager = subStateManagerMap[key];
  const storagePath = getStoragePath(worldName, sessionName, key);
  const storage = stateStorageFactory(storagePath);
  const manager = new StoredStateManager(
    baseStateManager,
    storage as Storage<S[keyof S]>,
  );
  return manager;
}

function getStoragePath(
  worldName: string,
  sessionName: string | undefined,
  subStateKey: string,
) {
  return `/${sessionName ? "Sessions" : "Worlds"}/${
    sessionName ?? worldName
  }/${subStateKey}`;
}
