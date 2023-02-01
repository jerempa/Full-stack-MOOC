import { useParams } from 'react-router-dom'
import { useState } from 'react'
import blogService from '../services/blogs'

const CommentForm = () => {
  const [comment, setComment] = useState('')

  const handleCommentChange = (event) => {
    setComment(event.target.value)
}

    const params = useParams('/blogs:id')
    const id = params.id

    const addComment = async () => {
      try {
        await blogService.addComment(id, {'content': comment})
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='comment'>
        <form onSubmit={addComment}>
        <div>
            <input
            id='comment'
            type="text"
            value={comment}
            name="Comment"
            onChange={handleCommentChange}
          />
        <button id='create_comment' type="submit">add comment</button>
        </div>
        </form>
      </div>

  )  
}

export default CommentForm