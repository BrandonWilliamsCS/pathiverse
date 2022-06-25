import { AsyncValueModel, createValueModel } from "lib/data-tools/async";
import { Scene } from "pathiverse/kernel/Scene";
import { ResourceIndicator } from "pathiverse/system/resource/ResourceIndicator";
import { StorySpecification } from "pathiverse/system/StorySpecification";
import { StoryApiModel } from "./StoryApiModel";

export class SessionPathiverseModel<Sc extends Scene, U> {
  public constructor(
    private readonly storyApiModel: StoryApiModel<Sc, U>,
    public readonly story: StorySpecification<U>,
  ) {}

  public getScene(sceneIndicator: ResourceIndicator): AsyncValueModel<Sc> {
    return createValueModel(() =>
      this.storyApiModel.getScene(this.story.id, sceneIndicator.value),
    );
  }

  public getContent(contentIndicator: ResourceIndicator) {
    return createValueModel(() =>
      this.storyApiModel.getContent(this.story.id, contentIndicator.value),
    );
  }
}
