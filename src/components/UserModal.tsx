import { useEffect } from 'react'
import { User } from '../types/user'

interface Props {
  user: User
  onClose: () => void
}

export default function UserModal({ user, onClose }: Props) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onClose])

  return (
    <div
  onClick={onClose}
  style={{
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <div
    onClick={(e) => e.stopPropagation()}
    style={{
      background: '#fff',
      padding: 24,
      width: 400,
      borderRadius: 10,
    }}
  >
    <h3>{user.name}</h3>
    <p><b>Email:</b> {user.email}</p>
    <p><b>Phone:</b> {user.phone}</p>
    <p><b>Website:</b> {user.website}</p>
    <p style={{ marginTop: 10 }}>
      <b>Address:</b><br />
      {user.address.street}, {user.address.city}
    </p>

    <button
      style={{
        marginTop: 16,
        padding: '8px 16px',
        borderRadius: 6,
        border: 'none',
        background: '#000',
        color: '#fff',
        cursor: 'pointer',
      }}
      onClick={onClose}
    >
      Close
    </button>
  </div>
</div>

  )
}
