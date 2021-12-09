import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const View = () => {
  const counter = useSelector(state => {
      console.log("From component View state = ", state);
      return state.counter.value
  });

  const url = 'https://reqres.in/api/users/5'

  useEffect(() => {
    console.log('Load data')
    fetch(url)
      .then(response => response.json())
      .then(data => console.log("Our data: ", data))
      .catch(error => console.error("Catch: ", error))
  }, [])
  return <div>Mutable value: {counter}</div>
}

export default View
