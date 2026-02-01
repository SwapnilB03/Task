import React from 'react'
import { User } from '../types/user'

interface Props {
  user: User
  onClick: (user: User) => void
}

const UserRow = ({ user, onClick }: Props) => {
  return (
    <div
  onClick={() => onClick(user)}
  style={{
    padding: 16,
    borderRadius: 8,
    border: '1px solid #e0e0e0',
    marginBottom: 12,
    cursor: 'pointer',
    background: '#fafafa',
  }}
>
  <div style={{ fontWeight: 600, fontSize: 16 }}>{user.name}</div>
  <div style={{ color: '#555' }}>{user.email}</div>
  <div style={{ color: '#777', fontSize: 14 }}>
    {user.company.name}
  </div>
</div>

  )
}

export default React.memo(UserRow)
