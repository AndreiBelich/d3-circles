import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../features/thunkUser/thunkUserSlice'

const ThunkUser = () => {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.users)
  console.log('Users - ', users)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  if (users.status === 'failed') {
    return <div>Fail fetching</div>
  }
  if (users.status === 'loading') {
    return <div>Load data...</div>
  }
  return (
    <>
      <h1>List users</h1>
      {users &&
        users.map((user, i) => <p key={`${user.name}--${i}`}>{user.name}</p>)}
    </>
  )
}

export default ThunkUser
