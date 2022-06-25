import { AsyncValueModel, createValueModel } from "lib/data-tools/async";
import { identity } from "lodash";
import { Scene } from "pathiverse/kernel/Scene";
import { encapsulateStoryReducer } from "pathiverse/kernel/story/encapsulateStoryReducer";
import { StoryState } from "pathiverse/kernel/story/StoryState";
import { StateSessionTracker } from "pathiverse/system/StateSessionTracker";
import { StorySpecification } from "pathiverse/system/StorySpecification";
import { StoryApiModel } from "./StoryApiModel";

export class RootPathiverseModel<Sc extends Scene, U> {
  public readonly storyList: AsyncValueModel<StorySpecification<U>[]>;

  public constructor(private readonly storyApiModel: StoryApiModel<Sc, U>) {
    this.storyList = createValueModel(() => storyApiModel.getStoryList());
  }

  public getStory(
    storyId: string,
  ): AsyncValueModel<StorySpecification<U> | undefined> {
    return this.storyList.map((storyList) =>
      storyList.find((story) => story.id === storyId),
    );
  }

  public async generateInitialSession(storyId: string) {
    const storySpecification = await this.getStory(
      storyId,
    ).promiseNewestValue();
    if (!storySpecification) {
      throw new Error(`Cannot find story with id ${storyId}`);
    }
    const initialScene = await this.storyApiModel.getScene(
      storySpecification.id,
      storySpecification.initialSceneIndicator.value,
    );
    return {
      storySpecification,
      stateSessionTracker: new StateSessionTracker<StoryState<Sc, U>>(
        encapsulateStoryReducer<Sc, U>(
          initialScene,
          identity,
          storySpecification.initialUserState,
        ),
      ),
    };
  }
}
