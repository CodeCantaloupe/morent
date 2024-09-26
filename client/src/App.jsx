import axios from 'axios';
import { useState, useEffect } from 'react';

const App = () => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    axios
    .get("http://localhost:5000/api/users/66f5295126ef1e2b1e704afd")
    .then((response) => {
      setUserName(response.data.object.userName)
    })
  }, [])

  return (
    <>
      <h1>{userName}</h1>
    </>
  )
}

export default App
