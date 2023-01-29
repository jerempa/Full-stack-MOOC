import { createSlice } from '@reduxjs/toolkit'


const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            const notificationMessage = action.payload
            state = notificationMessage
            return state
        },
        removeNotification(state) {
            state = ''
            return state
        }
    }
  })

export const { showNotification, newAnecdoteNotification, voteAnecdoteNotification, removeNotification } = notificationSlice.actions

let timeoutId
export const setNotification = (content, time) => {
    return dispatch => {
        dispatch(showNotification(content))
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            dispatch(removeNotification())
          }, time * 1000)
    }
}

export default notificationSlice.reducer