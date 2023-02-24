import { createSlice } from '@reduxjs/toolkit'
import { ACTIONS_STACK_KEY, STORIES_KEY } from '../../helper/contants';

const actionStackReducers = createSlice({
    name: ACTIONS_STACK_KEY,
    initialState: [],
    reducers: {
        push: (state, action) => {
            let hi = STORIES_KEY
            state.push({ hi, ...action.payload })
        },
        pop: (state) => {
            if (state.length > 0) state.pop()
        }
    },
})

export const { push, pop } = actionStackReducers.actions
export default actionStackReducers.reducer


// import { createSlice } from '@reduxjs/toolkit'
// import { ACTIONS_STACK_KEY } from '../../helper/contants'

// const actionStackReducers = createSlice({
//     name: ACTIONS_STACK_KEY,
//     initialState: [],
//     reducers: {
//         push: (state, action) => {
//             state.push({ ...action.payload })
//             console.log("111", action.payload);
//         },
//         pop: (state) => {
//             if (state.length > 0) state.pop()
//             console.log("112", state);
//         },
//         top: (state) => {
//             if (state.length > 0) return state[0]
//         },
//         isEmpty: (state) => {
//             return state.length === 0
//         },
//     },
// })

// export const { push, pop, top, isEmpty } = actionStackReducers.actions
// export default actionStackReducers.reducer
