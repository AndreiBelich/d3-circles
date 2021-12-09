import React from 'react'

const User = ({avatar, first_name, last_name, email}) => {
  return (
    <article key={avatar}>
      <div>
        <div>
          <img src={avatar} alt='avatar' />
        </div>
      </div>
      <div>First name: {first_name}</div>
      <div>Last name: {last_name}</div>
      <div>Email: {email}</div>
    </article>
  )
}

export default User
