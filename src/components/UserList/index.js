import React, { useState } from 'react'
import { useGetAllUsersQuery, useAddUserMutation } from '../../services/regres'
import User from '../User';

const UserList = () => {
  const [ currentPage, setCurrentPage] = useState(1);
  const { data : fetchData, isLoading, error } = useGetAllUsersQuery(currentPage)
  const [addUser] = useAddUserMutation();
  const addUserHandler = () => addUser({name: "Ivan", job: "teacher"}).then( response => console.log(response));
  
  if(isLoading){
    return <div>Loading data...</div>
  }
  const { total_pages, data } = fetchData;

  return (
    <section>
      <button onClick={addUserHandler}>Add new user</button>
      <div>
        <button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage( currentPage - 1)}
          >
          Previous Page
        </button>
        <span>{currentPage} / {total_pages}</span>
        <button
          disabled={currentPage === total_pages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next Page
        </button>
      </div>
      <div>
        {data.map((user) => <User key={user.avatar} {...user} />)}
      </div>
    </section>
  )    
}

export default UserList
