import { createSlice, current } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid'
// import Resize from '../../components/Editor/Resize'
import { Resize } from "../../components/Editor";
import {
  ADD_NEW_STORY_LAYER,
  COPY_STORY_LAYER,
  CREATE_NEW_STORY,
  HEADERS_TAGS,
  MULTI_MEDIA_TAGS,
  STORIES_KEY,
  TEXTS_TAGS,
} from "../../helper/contants";
import {
  generateId,
  getResizableStyles,
  getTagStyle,
  isUrl,
  validValue,
} from "../../helper/meta";

//Initial states of stories
// STORIES => LAYERS
// const initialState = {
//   currentStoryIndex: 0,
//   stories: [
//     ADD_NEW_STORY_LAYER,
//     {
//       id: generateId(),
//       backgroundColor: '',
//       backgroundUrl: '',
//       child: [],
//       isActive: false,
//     },
//     {
//       id: generateId(),
//       backgroundColor: '',
//       backgroundUrl: '',
//       child: [],
//       isActive: false,
//     },
//   ],
// }

/**
 * @description when createStory is call first time so state is:
 *                  {
 *                    active_storyId: 123,
 *                    data: {
 *                      [id_of_story]: {  //like: 12hgt50
 *                        name: '', // Name of story
 *                        tags: '', //meta serach for tag(s)
 *                        activeLayer: 0,
 *                        storyLayers: [
 *                          {
 *                            activeElementIndex: null,
 *                            id: generateId(), //like: 12hgt60
 *                            backgroundColor: '',
 *                            backgroundUrl: '',
 *                            isActive: boolean, // default true when newly created
 *                            elements: [  //Resizeable Component
 *                              {
 *                                index: arryIndex,
 *                                rectStyles: {}, //css styles
 *                                isActive: boolean, // default true when newly created
 *                                child: {
 *                                  tag: '',
 *                                  src: '', // if tag [img, video, gif, sticker] its required
 *                                  text: '', // if tag [h(1-4), p, span] its required
 *                                  child_style: {},
 *                                  isAnimating: false,
 *                                },
 *                              },
 *                            ],
 *                          },
 *                        ],
 *                      },
 *                    },
 *                  }
 */
const initialState = {
  animations: " ",
};

const storiesSlice = createSlice({
  name: STORIES_KEY,
  initialState,
  reducers: {
    createStory: (state, { payload }) => {
      let { name, tags, id } = payload;
      tags = validValue(tags) ? tags : "";
      let new_story = { [id]: { ...CREATE_NEW_STORY, name, tags } };
      return {
        ...state,
        active_storyId: id,
        data: state.data ? { ...state.data, ...new_story } : new_story,
      };
    },
    setAnimations: (state, action) => {
      state.animations = action.payload;
    },

    deleteStory: (state, { payload }) => {
      let { id } = payload;
      delete state.data[id];
    },

    activeStory: (state, { payload }) => {
      let { id } = payload;
      state.active_storyId = id;
    },

    activeStoryLayerChild: (state, action) => {
      let { active_storyId, data } = state;
      let { activeLayer, storyLayers } = data[active_storyId];
      let layer = storyLayers[activeLayer];
      if (validValue(layer.activeElementIndex)) {
        layer.elements[layer.activeElementIndex].isActive = false;
      }
      layer.elements[action.payload].isActive = true;
      layer.activeElementIndex = action.payload;
    },

    deActiveStoryLayerChild: (state, action) => {
      // console.log(action.payload)
      let { active_storyId, data } = state;
      let { activeLayer, storyLayers } = data[active_storyId];
      storyLayers[activeLayer].elements[action.payload].isActive = false;
      storyLayers[activeLayer].activeElementIndex = null;
    },

    // changeBackground: ({ active_storyId, data }, { payload }) => {
    //   let { type } = payload
    //   let { activeLayer, storyLayers } = data[active_storyId]
    //   // console.log(type, isUrl(type))
    //   storyLayers[activeLayer].backgroundUrl = ''
    //   storyLayers[activeLayer].backgroundColor = ''
    //   type === 'img' && isUrl(payload.val)
    //     ? (storyLayers[activeLayer].backgroundUrl = payload.val)
    //     : (storyLayers[activeLayer].backgroundColor = type)

    //     console.log("111", storyLayers[activeLayer].backgroundColor )
    // },

    changeBackground: (state, action) => {
      // return  state += action.payload,
      // console.log("changeBackground", action.payload)
      let { active_storyId } = state;
      let { type } = action.payload;
      let { activeLayer, storyLayers } = state.data[active_storyId];
      storyLayers[activeLayer].backgroundUrl = "";
      storyLayers[activeLayer].backgroundColor = "";
      type === "img" && isUrl(action.payload.val)
        ? (storyLayers[activeLayer].backgroundUrl = action.payload.val)
        : (storyLayers[activeLayer].backgroundColor = type);
    },

    changeLayerElementChildText: ({ active_storyId, data }, { payload }) => {
      let { index, text } = payload;
      let { activeLayer, storyLayers } = data[active_storyId];
      storyLayers[activeLayer].elements[index].child.text = text;
    },

    changeLayerElementChildStyle: ({ active_storyId, data }, { payload }) => {
      console.log(payload);
      let { activeLayer, storyLayers } = data[active_storyId];
      let { activeElementIndex, elements } = storyLayers[activeLayer];
      let prevStyle = elements[activeElementIndex].child.child_style;
      elements[activeElementIndex].child.child_style = {
        ...prevStyle,
        ...payload,
      };
    },

    changeRectAlignments: ({ active_storyId, data }, action) => {
      let { newAligns, index } = action.payload;
      // let { active_storyId, data } = state;
      let { activeLayer, storyLayers } = data[active_storyId];
      storyLayers[activeLayer].elements[index].rectStyles = newAligns;
      console.log("data", newAligns);
    },

    // getSlides = (() => {
    //     let tempArr = [...slides]
    //     let curr = tempArr.findIndex((a) => a.id === tempArr[currentSlide].id) + 1
    //     let startFrom = curr - 2 >= 2 ? curr - 3 : 0
    //     let endAt =
    //         slides.length >= 5 && startFrom === 0
    //             ? curr + 2
    //             : slides.length < 5
    //                 ? slides.length
    //                 : 5
    //     // console.log(slides.length, endAt)
    //     let a = tempArr.splice(startFrom, endAt)
    //     return a
    // }),

    changeStoryLayer: (state, { payload }) => {
      let { active_storyId } = state;
      let { storyLayers, activeLayer } = state.data[active_storyId];
      let { index } = payload;
      // if (index === storyLayers.length && storyLayers[activeLayer]) {
      //   storyLayers[activeLayer].isActive = false
      //   state.data[active_storyId].activeLayer = index
      // } else if (activeLayer === storyLayers.length && storyLayers[index]) {
      //   state.data[active_storyId].activeLayer = index
      //   storyLayers[index].isActive = true
      // } else if (index < storyLayers.length) {
      storyLayers[activeLayer].isActive = false;
      state.data[active_storyId].activeLayer = index;
      storyLayers[index].isActive = true;
      // }
    },

    addStoryLayer: (state, action) => {
      let { active_storyId } = state;
      let story = state.data[state.active_storyId];
      let { activeLayer, storyLayers } = story;
      storyLayers[activeLayer].isActive = false;
      storyLayers.splice(activeLayer + 1, 0, {
        ...ADD_NEW_STORY_LAYER,
        id: generateId(),
      });
      // console.log(activeLayer)
      state.data[active_storyId].activeLayer = activeLayer + 1;
      storyLayers[activeLayer + 1].isActive = true;
    },

    copyStoryLayer: (state, action) => {
      let { active_storyId } = state;
      let story = state.data[state.active_storyId];
      let { activeLayer, storyLayers } = story;
      storyLayers[activeLayer].isActive = false;
      storyLayers.splice(activeLayer, 0, {
        ...storyLayers[activeLayer],
        id: generateId(),
      });
      // console.log(activeLayer)
      state.data[active_storyId].activeLayer = activeLayer + 1;
      storyLayers[activeLayer + 1].isActive = true;
    },

    updateStoryLayer: (state, action) => {
      let { type: tag, val, alt } = action.payload;
      console.log("update image", action.payload);
      let data = state.data;
      console.log("sas", data);
      // let { activeLayer, storyLayers } = data[state.active_storyId]
      let currStory = data[state.active_storyId];
      console.log("sase", val);
      if (tag) {
        if (alt !== "background-image") {
          let layer = currStory.storyLayers[currStory.activeLayer];
          let index = layer.elements.length;
          // const prevIndex = layer.activeElementIndex
          if (validValue(layer.activeElementIndex)) {
            layer.elements[layer.activeElementIndex].isActive = false;
            console.log(
              layer.elements[layer.activeElementIndex].child.isActive
            );
          }
          layer.activeElementIndex = index;
          layer.elements.push({
            index,
            rectStyles: getResizableStyles(tag),
            isActive: true,
            child: {
              tag,
              src: MULTI_MEDIA_TAGS.includes(tag) ? val : null,
              text:
                TEXTS_TAGS.includes(tag) || HEADERS_TAGS.includes(tag)
                  ? val
                  : null,
              child_style: getTagStyle(tag),
              isAnimating: false,
            },
          });
          // console.log('prevIndex', prevIndex)
          // layer.elements[prevIndex].isActive =
          //   prevIndex === 0 && index === 0 ? true : false

          // let index = layer.child.length
          // let childTemp = [...layer.child]
          // layer.child.map((c) => {
          //   return (c.props.isActive = false)
          // })
          // layer.child.push(
          //   <Resize
          //     tag={tag}
          //     value={val}
          //     isActive={true}
          //     index={index}
          //     rectStyles={getTagStyle(tag)}
          //   />
          // )
          // console.log(childTemp)
          // layer.child = childTemp
        } else {
          storiesSlice.caseReducers.changeBackground(state, action);
        }
      }

      //Old Schema
      // let { type, val, alt } = action.payload
      // let { stories, currentStoryIndex } = state
      // if (type) {
      //   // console.log('Tag Props', val, alt)
      //   if (alt !== 'background-image') {
      //     stories[currentStoryIndex].child.push(
      //       <Resize tag={type} child={val} />
      //     )
      //   } else {
      //     storiesSlice.caseReducers.changeBackground(state, action)
      //   }
      // }
    },
    updatePostStoryLayer: (state, action) => {
      let { type: tag, val, alt } = action.payload;
      console.log("update image", action.payload);
      let data = state.data;
      console.log("sas", data);
      // let { activeLayer, storyLayers } = data[state.active_storyId]
      let currStory = data[state.active_storyId];
      console.log("sase", val);
      if (tag) {
        if (alt !== "background-image") {
          let layer = currStory.storyLayers[currStory.activeLayer];
          let index = layer.elements.length;
          // const prevIndex = layer.activeElementIndex
          if (validValue(layer.activeElementIndex)) {
            layer.elements[layer.activeElementIndex].isActive = false;
            console.log(
              layer.elements[layer.activeElementIndex].child.isActive
            );
          }
          layer.activeElementIndex = index;
          layer.elements.push({
            index,
            rectStyles: getResizableStyles(tag),
            isActive: true,
            child: {
              tag,
              src: MULTI_MEDIA_TAGS.includes(tag) ? val : null,
              text:
                TEXTS_TAGS.includes(tag) || HEADERS_TAGS.includes(tag)
                  ? val
                  : null,
              child_style: getTagStyle(tag),
              isAnimating: false,
            },
          });
          // console.log('prevIndex', prevIndex)
          // layer.elements[prevIndex].isActive =
          //   prevIndex === 0 && index === 0 ? true : false

          // let index = layer.child.length
          // let childTemp = [...layer.child]
          // layer.child.map((c) => {
          //   return (c.props.isActive = false)
          // })
          // layer.child.push(
          //   <Resize
          //     tag={tag}
          //     value={val}
          //     isActive={true}
          //     index={index}
          //     rectStyles={getTagStyle(tag)}
          //   />
          // )
          // console.log(childTemp)
          // layer.child = childTemp
        } else {
          storiesSlice.caseReducers.changeBackground(state, action);
        }
      }

      //Old Schema
      // let { type, val, alt } = action.payload
      // let { stories, currentStoryIndex } = state
      // if (type) {
      //   // console.log('Tag Props', val, alt)
      //   if (alt !== 'background-image') {
      //     stories[currentStoryIndex].child.push(
      //       <Resize tag={type} child={val} />
      //     )
      //   } else {
      //     storiesSlice.caseReducers.changeBackground(state, action)
      //   }
      // }
    },
    updateIndex1StoryLayer: (state, action) => {
      let { type: tag, val, alt } = action.payload;
      console.log("update image", action.payload);
      let data = state.data;
      console.log("sas", data);
      // let { activeLayer, storyLayers } = data[state.active_storyId]
      let currStory = data[state.active_storyId];
      console.log("sase", val);
      if (tag) {
        if (alt !== "background-image") {
          let layer = currStory.storyLayers[currStory.activeLayer];
          let index = layer.elements.length;
          // const prevIndex = layer.activeElementIndex
          if (validValue(layer.activeElementIndex)) {
            layer.elements[layer.activeElementIndex].isActive = false;
            console.log(
              layer.elements[layer.activeElementIndex].child.isActive
            );
          }
          layer.activeElementIndex = index;
          layer.elements.push({
            index,
            rectStyles: getResizableStyles(tag),
            isActive: true,
            child: {
              tag,
              src: MULTI_MEDIA_TAGS.includes(tag) ? val : null,
              text:
                TEXTS_TAGS.includes(tag) || HEADERS_TAGS.includes(tag)
                  ? val
                  : null,
              child_style: getTagStyle(tag),
              isAnimating: false,
            },
          });
          // console.log('prevIndex', prevIndex)
          // layer.elements[prevIndex].isActive =
          //   prevIndex === 0 && index === 0 ? true : false

          // let index = layer.child.length
          // let childTemp = [...layer.child]
          // layer.child.map((c) => {
          //   return (c.props.isActive = false)
          // })
          // layer.child.push(
          //   <Resize
          //     tag={tag}
          //     value={val}
          //     isActive={true}
          //     index={index}
          //     rectStyles={getTagStyle(tag)}
          //   />
          // )
          // console.log(childTemp)
          // layer.child = childTemp
        } else {
          storiesSlice.caseReducers.changeBackground(state, action);
        }
      }

      //Old Schema
      // let { type, val, alt } = action.payload
      // let { stories, currentStoryIndex } = state
      // if (type) {
      //   // console.log('Tag Props', val, alt)
      //   if (alt !== 'background-image') {
      //     stories[currentStoryIndex].child.push(
      //       <Resize tag={type} child={val} />
      //     )
      //   } else {
      //     storiesSlice.caseReducers.changeBackground(state, action)
      //   }
      // }
    },

    //TODO
    deleteStoryLayerChild: (state, { payload }) => {
      let { childIndex, slideId } = payload;
      let { active_storyId } = state;
      let { storyLayers, activeLayer } = state.data[active_storyId];
      storyLayers[activeLayer].child.filter((_, i) => i !== childIndex);
      // const selectedIndex = storyLayers.findIndex((slide) => slide.id === slideId)
      // storyLayers[selectedIndex].child = storyLayers[selectedIndex].child.filter(
      //   (_, i) => i !== childIndex
      // )
    },

    // const deleteSlide = useCallback((deleteIdx) => {
    //   const tempArr = [...slides]
    //   tempArr.splice(deleteIdx, 1)
    //   // let activeIndex = deleteIdx === tempArr.length ? deleteIdx - 1 : deleteIdx
    //   let activeIndex =
    //     deleteIdx === tempArr.length || deleteIdx > 0 ? deleteIdx - 1 : deleteIdx
    //   // console.log(deleteIdx, activeIndex)
    //   tempArr[activeIndex].isActive = true
    //   setCurrentSlide(activeIndex)
    //   setSlides(tempArr)
    //   closeModal()
    //   openNotification({
    //     type: 'success',
    //     desc: `Slide ${deleteIdx + 1} Deleted Successfully!`,
    //   })
    // })

    // const deleteSlideChild = useCallback((childIndex, slideId) => {
    //   let tempSlides = [...slides]
    //   const selectedIndex = tempSlides.findIndex((slide) => slide.id === slideId)
    //   tempSlides[selectedIndex].child = tempSlides[selectedIndex].child.filter(
    //     (obj, i) => i !== childIndex
    //   )
    //   setSlides(tempSlides)
    // })
  },
});

export const {
  copyStoryLayer,
  createStory,
  deleteStory,
  activeStory,
  activeStoryLayerChild,
  deActiveStoryLayerChild,
  addStoryLayer,
  updateStoryLayer,
  updatePostStoryLayer,
  updateIndex1StoryLayer,
  changeStoryLayer,
  changeBackground,
  changeRectAlignments,
  changeLayerElementChildText,
  changeLayerElementChildStyle,
  setAnimations,
} = storiesSlice.actions;

export const selectCount = (state) => state[STORIES_KEY];

export default storiesSlice.reducer;
