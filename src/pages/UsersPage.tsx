import { useMemo, useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { useDebounce } from '../hooks/useDebounce'
import UserList from '../components/UserList'
import UserModal from '../components/UserModal'
import { User } from '../types/user'

export default function UsersPage() {
  const { data, isLoading, isError } = useUsers()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const debouncedSearch = useDebounce(search)

  const users = useMemo(() => {
    if (!data) return []
    return data
      .filter((u) =>
        u.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .sort((a, b) =>
        sort === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      )
  }, [data, debouncedSearch, sort])

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading users</p>

  return (
  <div style={{ background: '#f4f6f8', minHeight: '100vh', padding: 24 }}>
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        background: '#fff',
        padding: 24,
        borderRadius: 8,
        boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
      }}
    >
      <h2 style={{ marginBottom: 16 }}>User Management</h2>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <input
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 6,
            border: '1px solid #ccc',
          }}
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          style={{ padding: 10, borderRadius: 6 }}
          onChange={(e) => setSort(e.target.value as any)}
        >
          <option value="asc">A–Z</option>
          <option value="desc">Z–A</option>
        </select>
      </div>

      <UserList users={users} onUserClick={setSelectedUser} />
    </div>

    {selectedUser && (
      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    )}
  </div>
)
}