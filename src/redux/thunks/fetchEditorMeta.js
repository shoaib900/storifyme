import { createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api'
import { VIDEO_ACCESS_TOKEN } from '../../config'
import { EDITOR_META_KEY } from '../../helper/contants'

export const fetchImages = createAsyncThunk(
  `${EDITOR_META_KEY}/getImages`,
  async (url, thunkApi) => {
    const res = await client.get(url, {
      signal: thunkApi.abort,
    })
    return res.data
  }
)

export const searchImages = createAsyncThunk(
  `${EDITOR_META_KEY}/searchImages`,
  async ({ url }, thunkApi) => {
    const res = await client.get(url, {
      signal: thunkApi.abort,
    })
    return res.data
  }
)

export const fetchStickers = createAsyncThunk(
  `${EDITOR_META_KEY}/getStickers`,
  async (url, thunkApi) => {
    const res = await client.get(url, {
      signal: thunkApi.abort,
    })
    return res.data
  }
)

export const searchStickers = createAsyncThunk(
  `${EDITOR_META_KEY}/searchStickers`,
  async ({ url }, thunkApi) => {
    const res = await client.get(url, {
      signal: thunkApi.abort,
    })
    return res.data
  }
)

export const fetchGiphys = createAsyncThunk(
  `${EDITOR_META_KEY}/getGiphys`,
  async (url, thunkApi) => {
    const res = await client.get(url, {
      signal: thunkApi.abort,
    })
    return res.data
  }
)

export const searchGiphys = createAsyncThunk(
  `${EDITOR_META_KEY}/searchGiphys`,
  async ({ url }, thunkApi) => {
    const res = await client.get(url, {
      signal: thunkApi.abort,
    })
    return res.data
  }
)

export const fetchVideos = createAsyncThunk(
  `${EDITOR_META_KEY}/getVideos`,
  async (url, thunkApi) => {
    const res = await client.get(url, {
      headers: {
        Authorization: `${VIDEO_ACCESS_TOKEN}`,
      },
      signal: thunkApi.abort,
    })
    return res.data
  }
)

export const searchVideos = createAsyncThunk(
  `${EDITOR_META_KEY}/searchVideos`,
  async ({ url }, thunkApi) => {
    const res = await client.get(url, {
      headers: {
        Authorization: `${VIDEO_ACCESS_TOKEN}`,
      },
      signal: thunkApi.abort,
    })
    return res.data
  }
)
