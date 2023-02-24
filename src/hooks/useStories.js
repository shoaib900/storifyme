import { useCallback, useEffect, useState } from "react";
import { useRedux } from ".";
import { STORIES_KEY } from "../helper/contants";
import {
  getBackgroundStyles,
  removeItemAndInsertAt,
  validValue,
} from "../helper/meta";

const useStories = () => {
  const [, , getState] = useRedux();
  const storiesStore = getState(STORIES_KEY);
  const [object, setObject] = useState(storiesStore);
  console.log("hi", object);

  useEffect(() => {
    console.log("object");
    stories();
  }, [storiesStore]);

  const stories = useCallback(() => {
    // let allStories, activeStory, storyLayers, layerStyles, activeStoryLayer, getLayerElements, getActiveLayerElement
    let { active_storyId, data } = storiesStore;
    let activeStory = data[active_storyId];
    let { activeLayer, storyLayers } = activeStory;
    if (validValue(storyLayers[activeLayer])) {
      let { elements, activeElementIndex, id, backgroundColor, backgroundUrl } =
        storyLayers[activeLayer];
      let layerStyles = getBackgroundStyles({
        color: backgroundColor,
        url: backgroundUrl,
      });
      let el = removeItemAndInsertAt(
        elements,
        activeElementIndex,
        1,
        elements.length - 1,
        elements[activeElementIndex]
      );
      return {
        active_storyId,
        activeStory,
        activeLayer,
        storyLayers,
        layerStyles,
        elements,
        renderElements: el,
        activeElementIndex,
      };
    }
  }, [storiesStore]);

  // const activeStory = () => { }
  // const storyLayers = () => { }
  // const activeStoryLayer = () => { }
  // const getLayerElements = () => { }
  // const getActiveLayerElement = () => { }

  return stories();
};

export default useStories;
