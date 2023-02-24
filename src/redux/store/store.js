import { configureStore } from "@reduxjs/toolkit";
import storiesReducers from "../slices/storiesSlice";
// import { logger } from 'redux-logger'
import undoable from "redux-undo";
import { logger } from "../middlewares";
import {
  ACTIONS_STACK_KEY,
  EDITOR_META_KEY,
  MODAL_SLICE_NAME,
  STORIES_KEY,
} from "../../helper/contants";
import editorMetaReducers from "../slices/editorMetaSlice";
import actionStackReducers from "../slices/actionStackSlice";
import modalReducers from "../slices/modalSlice";

const store = configureStore({
  reducer: {
    [STORIES_KEY]: undoable(storiesReducers, {
      limit: false, // set a limit for the size of the history
    }),
    // [STORIES_KEY]: storiesReducers,
    // [ACTIONS_STACK_KEY]: actionStackReducers,
    [EDITOR_META_KEY]: editorMetaReducers,
    [MODAL_SLICE_NAME]: modalReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export default store;
