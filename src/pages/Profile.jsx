import React from 'react'
import  useStore  from '@/store/useStore';

function Profile() {
    const { user } = useStore();
  return (
    <div className='profile'>
      <div className='profile__container'>
        <img src={user.avatar || "default-avatar.png"} alt="" />
        <div className="profile__info">
        <h2><span>Name:</span> {user.name}</h2>
        <p> <span>Username:</span> {user.username}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile