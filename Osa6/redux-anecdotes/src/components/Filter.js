import { setFilter } from '../reducers/filterReducer'
import { useDispatch, connect } from 'react-redux'

const Filter = (props) => {

    // const dispatch = useDispatch()

    const handleChange = (event) => {
      const content = event.target.value
      // dispatch(setFilter(content))
      props.setFilter(content)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
    setFilter,
  }

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter
  // export default Filter