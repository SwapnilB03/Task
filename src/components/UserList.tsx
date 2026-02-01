import { User } from '../types/user'
import UserRow from './UserRow'

interface Props {
  users: User[]
  onUserClick: (user: User) => void
}

export default function UserList({ users, onUserClick }: Props) {
  return (
    <>
      {users.map((user) => (
        <UserRow
          key={user.id}
          user={user}
          onClick={onUserClick}
        />
      ))}
    </>
  )
}
