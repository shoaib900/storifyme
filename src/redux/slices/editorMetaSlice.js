import { createSlice } from '@reduxjs/toolkit'
import {
  EDITOR_META_KEY,
  GIPHYS_NOT_FOUND,
  IMAGES_NOT_FOUND,
  STICKERS_NOT_FOUND,
  VIDEOS_NOT_FOUND,
} from '../../helper/contants'
import { getKeysFromObject, validString } from '../../helper/meta'
import {
  fetchGiphys,
  fetchImages,
  fetchStickers,
  fetchVideos,
  searchGiphys,
  searchImages,
  searchStickers,
  searchVideos,
} from '../thunks/fetchEditorMeta'

//This Slice contains gifs, images, giphy, videos, shapes, emoijis, stickers

const imagesInitialState = {
  loadingImages: false,
  searchingImagesFor: '',
  searchingBackgroundImagesFor: '',
  images: [],
  searchedImages: [],
  searchedBackgroundImages: [],
  imagesPage: 1,
  noImagesFoundMsg: '',
}

const stickersInitialState = {
  loadingStickers: false,
  stickers: [],
  searchedStickers: [],
  noStickersFoundMsg: '',
  searchForStickers: '',
}

const giphysInitialState = {
  loadingGiphys: false,
  giphys: [],
  searchGiphysFor: '',
  searchedGiphys: [],
  noGiphysFoundMsg: '',
}

const videosInitialState = {
  loadingVideos: false,
  videos: [],
  searchVideosFor: '',
  searchedVideos: [],
  noVideosFoundMsg: '',
  videosPage: 1,
}

const initialState = {
  ...imagesInitialState,
  ...stickersInitialState,
  ...giphysInitialState,
  ...videosInitialState,
}

const editorMetaSlice = createSlice({
  name: EDITOR_META_KEY,
  initialState,
  reducers: {
    clearSearch: (state, action) => {
      let { payload } = action
      let keys = getKeysFromObject(payload)
      keys.forEach((key) => {
        state[key] = payload[key]
      })
    },
  },
  extraReducers: {
    /* Images API Reducers */
    [fetchImages.pending]: (state, action) => {
      state.loadingImages = true
    },
    [fetchImages.fulfilled]: (state, action) => {
      state.loadingImages = false
      state.imagesPage++
      state.images.push(...action.payload)
    },
    [fetchImages.rejected]: (state) => {
      state.loadingImages = false
      if (state.images.length === 0) {
        state.noImagesFoundMsg = IMAGES_NOT_FOUND
      }
    },
    [searchImages.pending]: (state, action) => {
      let args = action.meta.arg
      state.loadingImages = true
      if (validString(args.for)) {
        state.searchingBackgroundImagesFor = args.query
      } else {
        state.searchingImagesFor = args.query
      }
    },
    [searchImages.fulfilled]: (state, action) => {
      let args = action.meta.arg
      state.loadingImages = false
      console.log(action.payload)
      if (validString(args.for)) {
        state.searchedBackgroundImages.unshift(...action.payload.results)
      } else {
        state.searchedImages.unshift(...action.payload.results)
      }
    },
    [searchImages.rejected]: (state, action) => {
      state.loadingImages = false
      if (state.images.length === 0 || state.searchedImages.length === 0) {
        state.noImagesFoundMsg = IMAGES_NOT_FOUND
      }
    },

    /* Stickers API Reducers  */
    [fetchStickers.pending]: (state) => {
      state.loadingStickers = true
    },
    [fetchStickers.fulfilled]: (state, action) => {
      state.loadingStickers = false
      state.stickers.push(...action.payload.data)
    },
    [fetchStickers.rejected]: (state) => {
      state.loadingStickers = false
      if (state.stickers.length === 0) {
        state.noStickersFoundMsg = STICKERS_NOT_FOUND
      }
    },
    [searchStickers.pending]: (state, action) => {
      state.searchForStickers = action.meta.arg?.query
      state.loadingStickers = true
    },
    [searchStickers.fulfilled]: (state, action) => {
      const { data } = action.payload
      state.loadingStickers = false
      state.noStickersFoundMsg = data.length > 0 ? '' : STICKERS_NOT_FOUND
      state.searchedStickers.unshift(...data)
    },
    [searchStickers.rejected]: (state) => {
      state.loadingStickers = false
      if (state.stickers.length === 0 || state.searchedStickers.length === 0) {
        state.noStickersFoundMsg = STICKERS_NOT_FOUND
      }
    },

    /* Giphys API Reducers  */
    [fetchGiphys.pending]: (state) => {
      state.loadingGiphys = true
    },
    [fetchGiphys.fulfilled]: (state, action) => {
      state.loadingGiphys = false
      state.giphys.push(...action.payload.data)
    },
    [fetchGiphys.rejected]: (state) => {
      state.loadingGiphys = false
      if (state.giphys.length === 0) {
        state.noGiphysFoundMsg = GIPHYS_NOT_FOUND
      }
    },
    [searchGiphys.pending]: (state, action) => {
      state.searchGiphysFor = action.meta.arg?.query
      state.loadingGiphys = true
    },
    [searchGiphys.fulfilled]: (state, action) => {
      const { data } = action.payload
      state.loadingGiphys = false
      state.noGiphysFoundMsg = data.length > 0 ? '' : GIPHYS_NOT_FOUND
      state.searchedGiphys.unshift(...data)
    },
    [searchGiphys.rejected]: (state) => {
      state.loadingGiphys = false
      if (state.searchedGiphys.length === 0 || state.giphys.length === 0) {
        state.noGiphysFoundMsg = GIPHYS_NOT_FOUND
      }
    },

    /* Videos API Reducers  */
    [fetchVideos.pending]: (state) => {
      state.loadingVideos = true
    },
    [fetchVideos.fulfilled]: (state, action) => {
      state.loadingVideos = false
      state.videosPage++
      state.videos.push(...action.payload.videos)
    },
    [fetchVideos.rejected]: (state) => {
      state.loadingVideos = false
      if (state.videos.length === 0) {
        state.noVideosFoundMsg = VIDEOS_NOT_FOUND
      }
    },
    [searchVideos.pending]: (state, action) => {
      state.searchVideosFor = action.meta.arg?.query
      state.loadingVideos = true
    },
    [searchVideos.fulfilled]: (state, action) => {
      const { videos } = action.payload
      state.loadingVideos = false
      state.noVideosFoundMsg = videos.length > 0 ? '' : VIDEOS_NOT_FOUND
      state.searchedVideos.unshift(...videos)
    },
    [searchVideos.rejected]: (state) => {
      state.loadingVideos = false
      if (state.searchedVideos.length === 0 || state.videos.length === 0) {
        state.noVideosFoundMsg = VIDEOS_NOT_FOUND
      }
    },
  },
})

export const { clearSearch } = editorMetaSlice.actions
export default editorMetaSlice.reducer
