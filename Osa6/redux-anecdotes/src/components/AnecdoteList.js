import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes)
    const filteredAnecdotes = anecdotes.filter(ane => ane.content.toLowerCase().includes(filter.toLowerCase()))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
      }


    return (
        <div> 
        {filteredAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList