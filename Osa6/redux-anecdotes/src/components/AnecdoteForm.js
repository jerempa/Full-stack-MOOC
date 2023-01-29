import { useDispatch, connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    // const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        // dispatch(createAnecdote(content))
        // dispatch(setNotification(`Added anecdote '${content}'`, 5))
        props.createAnecdote(content)
        props.setNotification(`Added anecdote '${content}'`, 5)
      }
    return (
        <div> 
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type='submit'> create </button>
      </form>
      </div>
    )
}

const mapStateToProps = (state) => {
    return {
    }
  }

const mapDispatchToProps = {
    createAnecdote,
    setNotification
  }

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
// export default AnecdoteForm