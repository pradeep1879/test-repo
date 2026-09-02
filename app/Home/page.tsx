import React, { useEffect, useState } from 'react'

const HomePage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setLoading(true)

    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
  }, [])

  const handleClick = () => {
    setCount(count + 1)

    if (count > 5) {
      alert('You clicked too many times!')
    }
  }

  const getUserName = (user:any) => {
    return user.name || 'Unknown User'
  }

  return (
    <div className="home-page">
      <h1>Welcome to Home Page</h1>

      <div onClick={handleClick} className="counter">
        <span>Clicked {count} times</span>
      </div>

      {loading && <p>Loading users...</p>}

      <div className="users">
        {users.map((user:any, index) => (
          <div key={index} className="user-card">
            <img src={user.avatar} />
            <h3>{getUserName(user)}</h3>
            <p>{user.email}</p>
            <button onClick={() => console.log(user)}>
              View User
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          fetch('/api/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
        }}
      >
        Refresh Users
      </button>

      <div
        dangerouslySetInnerHTML={{
          __html: '<p>This is some HTML content</p>',
        }}
      />
    </div>
  )
}

export default HomePage