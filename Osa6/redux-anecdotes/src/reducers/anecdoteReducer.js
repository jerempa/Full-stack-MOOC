import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a,b) => b.votes - a.votes)
    }
  }
})


export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = content => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVoteCount(content)
    const anecdotes = await anecdoteService.getAll()
    const index = anecdotes.findIndex(obj => obj.id === content.id)
    anecdotes[index] = updatedAnecdote
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer