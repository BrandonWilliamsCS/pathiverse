import { Scene } from "../../Scene";

export interface Story {
  name: string;
  startSceneName: string;
  availableScenes: Scene[];
}

export function sceneSourceFromStory(story: Story) {
  return (sceneName: string) => {
    const scene = story.availableScenes.find((s) => s.name === sceneName);
    return scene
      ? Promise.resolve(scene)
      : Promise.reject(`Could not find scene with name "${sceneName}"`);
  };
}
