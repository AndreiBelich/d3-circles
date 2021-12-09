import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, magicNumber, reset, incrementByAmount} from '../../features/counter/counterSlice'

const Counter = () => {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  const logger = (handler) => console.log("Handler data: ", handler());
  return (
    <div>
      <div>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          aria-label='Magic value'
          onClick={() => dispatch(magicNumber())}
        >
          Magic
        </button>
        <span>COUNT: {count}</span>
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          aria-label='Initial value'
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(incrementByAmount(17))}
        >
          Amount
        </button>
      </div>
    </div>
  )
}

export default Counter
