
// import { push, pop} from "../slices/actionStackSlice";
// import { changeBackground, updateStoryLayer } from "../slices/storiesSlice";

// export const redo = (store) => {
//   return store.dispatch(({
//     changeBackground,
//     updateStoryLayer
//   }))
// }

// console.log("111",redo)

// export const undo = (store) => (next) => (action) => {
//   return store.dispatch(pop({a: -1}))

// }


// import { push } from '../slices/actionStackSlice'
// const undoRedo = (store) => (next) => (action) => {
//   console.log(store.getState())
//     return store.dispatch(push({ a: 1 }))
//   return next(action)
// }
// export { undoRedo }
