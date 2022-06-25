import { ApiModel } from "lib/ApiModel";
import { Scene } from "pathiverse/kernel/Scene";
import { StorySpecification } from "pathiverse/system/StorySpecification";

export class StoryApiModel<Sc extends Scene, U> extends ApiModel {
  public getStoryList() {
    return this.getJsonResource<StorySpecification<U>[]>("/api/story/list.json");
  }

  public getScene(storyId: string, scenePath: string) {
    return this.getJsonResource<Sc>(
      this.joinPaths(["/api/story", storyId, "/scene", scenePath]),
    );
  }

  public getContent(storyId: string, contentPath: string) {
    return this.getRawResource(
      this.joinPaths(["/api/story", storyId, "/content", contentPath]),
    );
  }
}
