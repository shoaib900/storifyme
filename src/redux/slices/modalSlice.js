import { createSlice } from '@reduxjs/toolkit'
import { MODAL_SLICE_NAME } from '../../helper/contants'

const modalState = {
    open: false,
    body: null
}
const modalSlice = createSlice({
    name: MODAL_SLICE_NAME,
    initialState: modalState,
    reducers: {
        setModalContent: (state, { payload }) => {
            state.open = true
            state.body = payload // In payload we get coponent/children for our Modal
        },
        closeModal: (state) => {
            state.open = false
            state.body = null
        }
    }
})

export const { setModalContent, closeModal } = modalSlice.actions
export default modalSlice.reducer