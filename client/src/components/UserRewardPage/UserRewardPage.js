import React, { useState, useEffect } from 'react';
import RandomPoints from '../../containers/RandomPoints/RandomPoints';
import UserPoints from '../../containers/UserPoints/UserPoints';
import axios from '../../config/axios'
import localStorageServices from '../../services/localStorageUserServices'

const { getUserID } = localStorageServices

function UserRewardPage() {
  const [points, setPoints] = useState('')
  const [userId, setUserId] = useState('')

  const fetchPoints = async () => {
    await axios.get(`user/points/${getUserID()}`)
      .then(res => {
        console.log(res.data)
        setPoints(res.data.points)
        setUserId(res.data.id)
      })
  }

  useEffect(() => {
    fetchPoints()
  }, []);

  return (
    <div className='clientPage'>
      <UserPoints points={points} />
      <RandomPoints points={points}  userId={userId} fetchPoints={fetchPoints}/>
    </div>
  )
}

export default UserRewardPage;
