import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewAnecdote = async (content) => {
    const anecdote = { content, votes: 0 }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const updateVoteCount = async (anecdote) => {
    const url = `${baseUrl}/${anecdote.id}`
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const response = await axios.put(url, updatedAnecdote)
    return response.data
}

export default { getAll, createNewAnecdote, updateVoteCount }